'use client';

import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">
            Translate-app
          </h1>
          <div className="bg-gray-100 p-8 rounded-lg max-w-3xl mx-auto">
            <p className="text-xl text-gray-700 mb-6">
              AI 기술을 활용한 정확하고 빠른 AI분야 논문 번역 서비스를 경험해보세요.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              PDF 문서를 업로드하면 자동으로 번역된 결과를 받아볼 수 있습니다.
              이메일 인증을 통해 간편하게 서비스를 이용해보세요.
            </p>
            <p className="text-lg text-gray-600">
              번역이 완료되면 등록된 이메일로 결과를 보내드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">서비스 특징</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">사용자 인증 최소화</h3>
              <p className="text-gray-600">이메일만으로 빠르게 서비스를 시작할 수 있습니다.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">PDF 파일 번역</h3>
              <p className="text-gray-600">PDF 문서를 업로드하면 자동으로 번역을 진행합니다.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">번역 결과 이메일 발송</h3>
              <p className="text-gray-600">번역이 완료되면 결과를 이메일로 받아보실 수 있습니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">이용 방법</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">1</div>
            <h3 className="font-semibold mb-2">이메일 입력</h3>
            <p className="text-gray-600">서비스 이용을 위한 이메일을 입력합니다.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">2</div>
            <h3 className="font-semibold mb-2">인증 정보 수신</h3>
            <p className="text-gray-600">이메일로 로그인 정보를 받습니다.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">3</div>
            <h3 className="font-semibold mb-2">파일 업로드</h3>
            <p className="text-gray-600">번역할 PDF 파일을 업로드합니다.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">4</div>
            <h3 className="font-semibold mb-2">번역 결과 확인</h3>
            <p className="text-gray-600">이메일로 번역된 파일을 받아봅니다.</p>
          </div>
        </div>
      </section>
    </div>
  );
} 