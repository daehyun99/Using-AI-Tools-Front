'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const PDF_REGEX = /\.pdf$/i;

interface AuthResponse {
  status: number | string;
  msg: string;
  error: any;
  data: {
    email: string;
  };
}

interface TranslateResponse {
  status: number | string;
  msg: string;
  error: any;
  data: any;
}

const authenticateUser = async (uuid: string, password: string): Promise<AuthResponse> => {
  const response = await fetch('http://localhost:8000/Auth/one-time-auth/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uuid, password }),
  });
  const data = await response.json();
  if (!(data.status === 200 || data.status === '200' || data.status === 'SUCCESS')) {
    throw new Error(data.msg || '인증에 실패했습니다.');
  }
  return data;
};

const translateFile = async (file: File, email: string): Promise<TranslateResponse> => {
  const url = `http://localhost:8000/Translate/?service=openai&email_address=${encodeURIComponent(email)}`;
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  if (!(data.status === 200 || data.status === '200' || data.status === 'SUCCESS')) {
    throw new Error(data.msg || '번역에 실패했습니다.');
  }
  return data;
};

export default function UploadPage() {
  const [uuid, setUuid] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uuid || !password || !file) {
      alert('[Fail] 모든 필드를 입력해주세요.');
      return;
    }
    if (!PDF_REGEX.test(file.name)) {
      alert('[Fail] PDF 파일만 업로드 가능합니다.');
      return;
    }
    try {
      setIsSubmitting(true);
      // 1. 사용자 인증
      const authResult = await authenticateUser(uuid, password);
      const userEmail = authResult.data.email;
      if (!userEmail) {
        throw new Error('사용자 이메일 정보를 찾을 수 없습니다.');
      }
      // 2. 파일 번역 요청
      await translateFile(file, userEmail);
      alert('[Success] 파일이 성공적으로 업로드되었습니다. 번역 결과는 이메일로 전송됩니다.');
      setUuid('');
      setPassword('');
      setFile(null);
    } catch (error) {
      console.error('Upload failed:', error);
      if (error instanceof Error) {
        alert(`[Fail] ${error.message}`);
      } else {
        alert('[Fail] 처리 중 오류가 발생했습니다.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">파일 번역</h1>
          <p className="text-gray-600">
            번역할 PDF 파일을 업로드하고 인증 정보를 입력해주세요.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="uuid" className="block text-sm font-medium text-gray-700 mb-2">
                UUID
              </label>
              <input
                type="text"
                id="uuid"
                value={uuid}
                onChange={(e) => setUuid(e.target.value)}
                className="input-primary"
                placeholder="UUID를 입력하세요"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-primary"
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                번역할 PDF 파일
              </label>
              <input
                type="file"
                id="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="input-primary"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-primary w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? '처리 중...' : '파일 업로드 및 번역'}
            </button>
          </div>
          <div className="mt-8 text-sm text-gray-500">
            <h3 className="font-medium text-gray-900 mb-2">안내사항</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>입력하신 ID/PW가 올바른 경우에만 번역이 진행됩니다.</li>
              <li>번역된 파일은 등록된 이메일로 전송됩니다.</li>
              <li>PDF 파일만 지원합니다.</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}
