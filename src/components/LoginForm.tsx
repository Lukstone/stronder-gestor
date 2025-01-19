import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../services/authContext';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fadeIn, setFadeIn] = useState(false);
  const {login} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      toast.success('Login realizado com sucesso!');
      navigate('/products');
    } catch (error) {
      toast.error('Credenciais Inválidas');
    }
  };

  return (
    <div className={`min-h-screen flex transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className="w-1/2 flex items-center justify-center" style={{ backgroundColor: '#EF4D48' }}>
        <img src="https://stronder.com.br/wp-content/uploads/2023/07/LOGO-SITE-180X60-4.png" alt="Logo" className="h-100 w-100" /> {/* Aumentar tamanho da logo */}
      </div>
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <img src="https://firebasestorage.googleapis.com/v0/b/stronder-37202.appspot.com/o/6k2.webp?alt=media&token=08111085-484e-482a-8e94-c2e71eba7c9b" alt="Logo" className="mx-auto mb-8 h-40" /> {/* Logo acima do formulário */}
          <h1 className="text-2xl font-bold text-center mb-6">Gerenciador de Produtos</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Usuário</label>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Insira seu Usuário"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Insira sua Senha"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};