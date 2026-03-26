import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createStudent, updateStudent, fetchStudentById } from '../../api/studentApi';
import { Save, X, PlusCircle } from 'lucide-react';

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '', email: '', age: '', course: '', subjects: ['', '', '', '', '']
  });

  useEffect(() => {
    if (isEdit) {
      fetchStudentById(id).then(res => {
        const { name, email, age, course, subjects } = res.data.data;
        // Only set the fields the form actually uses
        setFormData({ name, email, age, course, subjects });
      });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a clean payload
    const payload = {
      ...formData,
      age: parseInt(formData.age, 10)
    };

    try {
      if (isEdit) await updateStudent(id, payload);
      else await createStudent(payload);
      navigate('/');
    } catch (err) {
      // Log the actual error to the console so you can see Prisma's message
      console.error("Submission Error:", err.response?.data?.error || err.message);
      alert("Error saving student. Check console for details.");
    }
  };

  const updateSubject = (index, value) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index] = value;
    setFormData({ ...formData, subjects: newSubjects });
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">
          {isEdit ? 'Update Student Profile' : 'Register New Student'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-slate-500">Full Name</label>
              <input type="text" required placeholder="John Doe" className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-slate-500">Age</label>
              <input type="number" required placeholder="19" className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-slate-500">Email Address</label>
            <input type="email" required placeholder="john@university.com" className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-slate-500">Course / Major</label>
            <input type="text" required placeholder="BTech CSE AI/ML" className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
              value={formData.course} onChange={e => setFormData({...formData, course: e.target.value})} />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-500">Core Subjects (Min. 5)</label>
            <div className="grid grid-cols-1 gap-2">
              {formData.subjects.map((sub, i) => (
                <input key={i} type="text" required placeholder={`Subject ${i+1}`} className="p-2 bg-white border border-slate-200 rounded-lg focus:border-primary outline-none text-sm"
                  value={sub} onChange={e => updateSubject(i, e.target.value)} />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-slate-900 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
              <Save size={20} /> {isEdit ? 'Save Changes' : 'Create Student'}
            </button>
            <button type="button" onClick={() => navigate('/')} className="bg-slate-100 text-slate-600 px-6 rounded-2xl font-bold hover:bg-slate-200 transition-all">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;