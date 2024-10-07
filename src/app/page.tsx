"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [base64Files, setBase64Files] = useState<
    { name: string; data: string }[]
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const base64Results = await Promise.all(
        Array.from(files).map(async (file) => ({
          name: file.name,
          data: await fileToBase64(file),
        }))
      );
      setBase64Files(base64Results);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCopy = (data: string) => {
    navigator.clipboard.writeText(data);
  };

  const handleOpenFile = (data: string) => {
    const newTab = window.open();
    if (newTab) {
      newTab.document.write(
        `<iframe src="${data}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`
      );
    }
  };

  const handleChooseFiles = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white py-4 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
          Base64 Converter
        </h1>
      </header>

      <main className="flex-grow p-4 container mx-auto max-w-7xl">
        <div className="grid gap-4 items-start">
          <input
            type="file"
            ref={fileInputRef}
            multiple
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
          />
          <Button onClick={handleChooseFiles} className="w-full sm:w-auto">
            Choose Files
          </Button>
          {base64Files.map((file, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-lg font-semibold">{file.name}</h3>
              <Textarea
                value={file.data}
                readOnly
                className="min-h-[150px] w-full"
                placeholder="Base64 encoded file will appear here..."
              />
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => handleCopy(file.data)}>
                  Copy to Clipboard
                </Button>
                <Button onClick={() => handleOpenFile(file.data)}>
                  Open File
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p className="text-sm sm:text-base">Made by Khushaalan 2024</p>
      </footer>
    </div>
  );
}
