import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  getAdminQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '../services/api';

const EMPTY_FORM = {
  topic:         '',
  difficulty:    6,
  question:      '',
  option0:       '',
  option1:       '',
  option2:       '',
  option3:       '',
  correctAnswer: '',
  explanation:   '',
};

export default function AdminQuestionsPage() {
  const { levelId }  = useParams();
  const { state }    = useLocation();
  const navigate     = useNavigate();
  const level        = state?.level;

  const [questions, setQuestions] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState('');
  const [success,   setSuccess]   = useState('');

  // Form state
  const [form,      setForm]      = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);  // null = adding new
  const [showForm,  setShowForm]  = useState(false);
  const [saving,    setSaving]    = useState(false);

  const fetchQuestions = async () => {
    try {
      const res = await getAdminQuestions(levelId);
      setQuestions(res.data.data);
    } catch {
      setError('Could not load questions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') navigate('/');
    fetchQuestions();
  }, [levelId]);

  const showMsg = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(''), 3000);
  };

  const openAddForm = () => {
    setForm({ ...EMPTY_FORM, topic: level?.topic || '', difficulty: level?.grade || 6 });
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (q) => {
    setForm({
      topic:         q.topic,
      difficulty:    q.difficulty,
      question:      q.question,
      option0:       q.options[0] ?? '',
      option1:       q.options[1] ?? '',
      option2:       q.options[2] ?? '',
      option3:       q.options[3] ?? '',
      correctAnswer: q.correctAnswer,
      explanation:   q.explanation || '',
    });
    setEditingId(q._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { topic, question, option0, option1, option2, option3, correctAnswer } = form;
    if (!topic || !question || !option0 || !option1 || !correctAnswer) {
      setError('Please fill in topic, question, at least 2 options, and correct answer.');
      return;
    }

    const options = [option0, option1, option2, option3].filter(o => o.trim() !== '');
    if (!options.includes(correctAnswer)) {
      setError('Correct answer must match one of the options exactly.');
      return;
    }

    setSaving(true);
    setError('');
    try {
      const payload = {
        levelId,
        topic:         form.topic,
        difficulty:    Number(form.difficulty),
        question:      form.question,
        options,
        correctAnswer: form.correctAnswer,
        explanation:   form.explanation,
      };

      if (editingId) {
        await updateQuestion(editingId, payload);
        showMsg('✅ Question updated!');
      } else {
        await createQuestion(payload);
        showMsg('✅ Question added!');
      }

      setShowForm(false);
      setEditingId(null);
      fetchQuestions();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save question.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this question? This cannot be undone.')) return;
    try {
      await deleteQuestion(id);
      showMsg('🗑 Question deleted.');
      fetchQuestions();
    } catch {
      setError('Failed to delete question.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-purple to-game-dark px-4 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <button
              onClick={() => navigate('/admin')}
              className="text-white/60 hover:text-white text-sm transition mb-1 block"
            >
              ← Back to Admin
            </button>
            <h1 className="text-2xl font-black text-game-yellow">
              Level {level?.levelNumber} — {level?.topic}
            </h1>
            <p className="text-white/50 text-sm">Grade {level?.grade} · {questions.length} questions</p>
          </div>
          <button
            onClick={openAddForm}
            className="bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-2 rounded-xl transition"
          >
            + Add Question
          </button>
        </div>

        {/* Success / Error messages */}
        {success && <div className="bg-green-500/20 border border-green-400/40 text-green-300 rounded-xl px-4 py-3 mb-4">{success}</div>}
        {error   && <div className="bg-red-500/20 border border-red-400/40 text-red-300 rounded-xl px-4 py-3 mb-4">{error}</div>}

        {/* ── Add / Edit Form ── */}
        {showForm && (
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-game-purple">
                {editingId ? 'Edit Question' : 'Add New Question'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            <div className="grid grid-cols-1 gap-4">

              {/* Topic */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Topic</label>
                <input
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                  placeholder="e.g. Natural Numbers & Numeration"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-game-purple"
                />
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Difficulty (grade level 1–10)</label>
                <select
                  name="difficulty"
                  value={form.difficulty}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-game-purple"
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <option key={n} value={n}>Grade {n}</option>
                  ))}
                </select>
              </div>

              {/* Question */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Question *</label>
                <textarea
                  name="question"
                  value={form.question}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g. How many 4-digit numbers are there?"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-game-purple"
                />
              </div>

              {/* Options */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Options * (min 2, max 4)</label>
                <div className="grid grid-cols-2 gap-3">
                  {[0,1,2,3].map(i => (
                    <input
                      key={i}
                      name={`option${i}`}
                      value={form[`option${i}`]}
                      onChange={handleChange}
                      placeholder={`Option ${i + 1}${i < 2 ? ' *' : ' (optional)'}`}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-game-purple"
                    />
                  ))}
                </div>
              </div>

              {/* Correct Answer */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Correct Answer * (must match one option exactly)</label>
                <input
                  name="correctAnswer"
                  value={form.correctAnswer}
                  onChange={handleChange}
                  placeholder="e.g. 9000"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Explanation */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Explanation (optional)</label>
                <input
                  name="explanation"
                  value={form.explanation}
                  onChange={handleChange}
                  placeholder="e.g. 9999 − 1000 + 1 = 9000"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-game-purple"
                />
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSubmit}
                  disabled={saving}
                  className="flex-1 bg-game-purple text-white font-bold py-3 rounded-xl hover:opacity-90 disabled:opacity-50 transition"
                >
                  {saving ? 'Saving…' : editingId ? 'Update Question' : 'Add Question'}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Questions List ── */}
        {loading && <p className="text-white/60 animate-pulse">Loading questions…</p>}

        {!loading && questions.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/40 text-lg mb-4">No questions yet for this level.</p>
            <button onClick={openAddForm} className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl">
              + Add First Question
            </button>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {questions.map((q, idx) => (
            <div key={q._id} className="bg-white rounded-2xl p-5 shadow-lg">
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <p className="text-xs text-gray-400 mb-1">Q{idx + 1} · {q.topic}</p>
                  <p className="font-bold text-gray-800 mb-3">{q.question}</p>

                  {/* Options grid */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {q.options.map((opt, i) => (
                      <div
                        key={i}
                        className={`px-3 py-2 rounded-lg text-sm ${
                          String(opt) === String(q.correctAnswer)
                            ? 'bg-green-100 text-green-800 border border-green-300 font-medium'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {String(opt) === String(q.correctAnswer) ? '✅ ' : ''}{opt}
                      </div>
                    ))}
                  </div>

                  {q.explanation && (
                    <p className="text-xs text-gray-500 italic bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
                      💡 {q.explanation}
                    </p>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button
                    onClick={() => openEditForm(q)}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold px-4 py-2 rounded-lg text-sm transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(q._id)}
                    className="bg-red-100 hover:bg-red-200 text-red-700 font-bold px-4 py-2 rounded-lg text-sm transition"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
