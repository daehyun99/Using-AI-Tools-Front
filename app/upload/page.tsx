'use client';

import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';

interface UploadError {
  type: 'auth' | 'limit' | 'file' | 'service';
  message: string;
}

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileSelect = (file: File) => {
    if (file.type !== 'application/pdf') {
      alert('[Fail] 잘못된 파일 형식입니다. (PDF만 가능)');
      return;
    }
    setSelectedFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !formData.id || !formData.password) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
      setIsUploading(true);
      
      // 서비스 시뮬레이션
      const error = Math.random() < 0.3 ? {
        type: ['auth', 'limit', 'service'][Math.floor(Math.random() * 3)],
        message: ''
      } as UploadError : null;

      if (error) {
        switch (error.type) {
          case 'auth':
            throw new Error('[Fail] ID 또는 PW가 일치하지 않습니다.');
          case 'limit':
            throw new Error('[Fail] 남은 번역 횟수가 없습니다.');
          case 'service':
            throw new Error('[Fail] OpenAI API 토큰 제한 (서비스 문제)');
        }
      }

      // 성공 시뮬레이션
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setUploadProgress(i);
      }
      
      alert('[Success] 요청이 완료되었습니다. 메일을 확인해주세요. (번역에는 3 ~ 5분 정도 소요됩니다)');
      
      // 폼 초기화
      setFormData({ id: '', password: '' });
      setSelectedFile(null);
      
    } catch (error) {
      console.error('Upload failed:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('[Fail] 일일 이메일 전송 한도 초과 (서비스 문제)');
      }
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">PDF 파일 번역</h1>
          <p className="text-gray-600">
            발급받은 ID/PW를 입력하고 번역할 PDF 파일을 업로드해주세요.
            <br />
            번역이 완료되면 등록된 이메일로 결과를 보내드립니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          {/* ID/PW 입력 폼 */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                ID
              </label>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                className="input-primary"
                placeholder="발급받은 ID를 입력하세요"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input-primary"
                placeholder="발급받은 비밀번호를 입력하세요"
                required
              />
            </div>
          </div>

          {/* 파일 업로드 */}
          <FileUpload onFileSelect={handleFileSelect} />
          
          {/* 제출 버튼 */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              disabled={isUploading}
              className={`btn-primary w-full md:w-auto ${
                isUploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isUploading ? '업로드 중...' : '번역 시작'}
            </button>
          </div>
          
          {/* 업로드 진행 상태 */}
          {isUploading && (
            <div className="mt-8">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-center mt-4 text-gray-600">
                파일 업로드 중... {uploadProgress}%
              </p>
            </div>
          )}

          {/* 주의사항 */}
          <div className="mt-8 space-y-4 text-sm text-gray-500">
            <h3 className="font-medium text-gray-900">주의사항</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>PDF 형식의 파일만 업로드 가능합니다.</li>
              <li>파일 크기는 최대 10MB까지 지원됩니다.</li>
              <li>번역 시간은 파일 크기에 따라 수 분이 소요될 수 있습니다.</li>
              <li>번역 완료 시 이메일로 알림을 보내드립니다.</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
} 