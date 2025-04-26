'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const registerEmail = async (email: string) => {
  const response = await fetch('http://localhost:8000/Auth/register/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || '이메일 등록에 실패했습니다.');
  }

  return response.json();
};

export default function EmailPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!EMAIL_REGEX.test(email)) {
      alert('[Fail] 잘못된 이메일 양식입니다.');
      return;
    }

    try {
      setIsSubmitting(true);
      await registerEmail(email);
      alert('[Success] 이메일로 ID와 PW가 발급되었습니다. 이메일을 확인해주세요.');
      setEmail('');
    } catch (error) {
      console.error('Email submission failed:', error);
      if (error instanceof Error) {
        if (error.message.includes('daily_limit_exceeded')) {
          alert('[Fail] 일일 이메일 전송 한도 초과 (서비스 문제)');
        } else {
          alert(`[Fail] ${error.message}`);
        }
      } else {
        alert('[Fail] 이메일 등록에 실패했습니다.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">이메일 인증</h1>
          <p className="text-gray-600">
            서비스 이용을 위한 이메일을 입력해주세요.
            <br />
            입력하신 이메일로 인증 정보를 보내드립니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                이메일 주소
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-primary"
                placeholder="your@email.com"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-primary w-full ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? '처리 중...' : '인증 정보 받기'}
            </button>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <h3 className="font-medium text-gray-900 mb-2">안내사항</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>입력하신 이메일로 고유 ID와 비밀번호가 발송됩니다.</li>
              <li>스팸 메일함도 확인해주세요.</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
} 