import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchStudentById, deleteStudent } from '../../api/studentApi';
import { Edit3, Trash2, ArrowLeft, BookOpen } from 'lucide-react';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchStudentById(id)
      .then(res => setStudent(res.data.data))
      .catch(err => {
        console.error("Fetch error:", err);
        // Optional: navigate('/') or show an error message
      });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      await deleteStudent(id);
      navigate('/');
    }
  };

  if (!student) return <div className="p-10 text-center text-slate-400">Loading Profile...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-primary mb-8 transition-colors">
        <ArrowLeft size={18} /> Back to Directory
      </button>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {/* Header Section */}
        <div className="bg-slate-900 p-8 text-white flex justify-between items-end">
          <div>
            <p className="text-sky-400 font-medium mb-1 uppercase tracking-widest text-xs">{student.course}</p>
            <h1 className="text-4xl font-bold">{student.name}</h1>
          </div>
          <div className="flex gap-3">
            <Link to={`/edit/${id}`} className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
              <Edit3 size={20} />
            </Link>
            <button onClick={handleDelete} className="p-3 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-xl transition-all">
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase">Email Address</label>
              <p className="text-slate-700 font-medium">{student.email}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase">Age</label>
              <p className="text-slate-700 font-medium">{student.age} Years Old</p>
            </div>
          </div>

          <div className="md:col-span-2 border-l border-slate-100 pl-0 md:pl-8">
            <div className="flex items-center gap-2 mb-4 text-slate-800 font-bold">
              <BookOpen size={20} className="text-primary" />
              <h2>Enrolled Subjects</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {student.subjects.map((sub, index) => (
                <span key={index} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-sm font-medium border border-slate-200">
                  {sub}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;