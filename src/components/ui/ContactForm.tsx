'use client';

import React, { useState, useEffect } from 'react';

export default function ContactForm() {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // フォームの各項目が空白でないか確認し、ボタンを有効化/無効化する
    const isValid =
      formValues.name.trim() !== '' &&
      formValues.email.trim() !== '' &&
      formValues.message.trim() !== '';
    setIsFormValid(isValid);
  }, [formValues]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('entry.1186882642', formValues.name);
    formData.append('entry.505427583', formValues.email);
    formData.append('entry.229638145', formValues.message);

    try {
      await fetch(
        'https://docs.google.com/forms/u/0/d/e/1FAIpQLSc1rCajkSlG_vHe2QQ6q_kSHZrDa1VvL27ZXycP8rMfAFb9Hg/formResponse',
        {
          method: 'POST',
          body: formData,
          mode: 'no-cors',
        }
      );

      // フォーム送信が成功したら成功ポップアップを表示
      setShowSuccessPopup(true);
    } catch (error) {
      console.error('Error:', error);
      // フォーム送信が失敗したらエラーポップアップを表示
      setShowErrorPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-12 sm:p-24 bg-white rounded-lg">
      {/* タイトル */}
      <h2 className="text-2xl font-bold text-center mb-6">お問い合わせ</h2>

      <p className="text-center mb-6">
        活動内容に関する情報は、本HP上でご確認いただけます
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col md:flex-row md:items-center">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/4"
            htmlFor="name"
          >
            氏名
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formValues.name}
            onChange={handleInputChange}
            required
            className="w-full md:w-3/4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4 flex flex-col md:flex-row md:items-center">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/4"
            htmlFor="email"
          >
            メールアドレス
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formValues.email}
            onChange={handleInputChange}
            required
            className="w-full md:w-3/4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6 flex flex-col md:flex-row md:items-center">
          <label
            className="block text-gray-700 text-sm font-bold md:mb-0 md:w-1/4"
            htmlFor="message"
          >
            質問内容
          </label>
          <textarea
            name="message"
            id="message"
            rows={5}
            value={formValues.message}
            onChange={handleInputChange}
            required
            className="w-full md:w-3/4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isFormValid || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isFormValid || loading}
          >
            {loading ? '送信中...' : '送信'}
          </button>
        </div>
      </form>

      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">送信完了</h2>
            <p>お問い合わせありがとうございます。</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setShowSuccessPopup(false)}
            >
              閉じる
            </button>
          </div>
        </div>
      )}

      {showErrorPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">送信失敗</h2>
            <p>申し訳ありませんが、送信に失敗しました。再度お試しください。</p>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => setShowErrorPopup(false)}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}