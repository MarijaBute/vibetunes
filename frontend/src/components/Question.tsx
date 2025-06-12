import { Question as QuestionType } from '@/lib/types';

interface QuestionProps {
  question: QuestionType;
  onAnswer: (answer: any) => void;
  value: any;
  mood?: string;
}

const moodEmojis: { [key: string]: string } = {
  happy: '😊',
  sad: '😢',
  energetic: '⚡',
  calm: '😊',
  focused: '🧠',
  angry: '😡',
  romantic: '❤️',
};

export default function Question({ question, onAnswer, value, mood }: QuestionProps) {
  const handleSingleSelect = (option: string) => {
    onAnswer(option);
  };

  const handleMultipleSelect = (option: string) => {
    const currentValue = (value as string[]) || [];
    if (currentValue.includes(option)) {
      onAnswer(currentValue.filter((item: string) => item !== option));
    } else {
      onAnswer([...currentValue, option]);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.value);
    const tempo = question.options![index];
    onAnswer(tempo);
  };

  const handleTextChange = (field: 'love' | 'avoid', text: string) => {
    onAnswer({ ...(value || { love: '', avoid: '' }), [field]: text });
  };

  const getMoodHighlightColor = () => {
    switch (mood) {
      case 'happy':
        return 'bg-mood-happy';
      case 'sad':
        return 'bg-mood-sad';
      case 'energetic':
        return 'bg-mood-energetic';
      case 'calm':
        return 'bg-mood-calm';
      case 'focused':
        return 'bg-mood-focused';
      case 'angry':
        return 'bg-mood-angry';
      case 'romantic':
        return 'bg-mood-romantic';
      default:
        return 'bg-blue-500';
    }
  };

  if (question.type === 'single') {
    return (
      <div>
        <h2 className='text-3xl font-bold text-black mb-6'>{question.text}</h2>
        {question.id === 'mood' ? (
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {question.options!.map((option) => (
              <button
                key={option}
                onClick={() => handleSingleSelect(option)}
                className={`mood-option ${
                  value === option
                    ? `${getMoodHighlightColor()} mood-option-selected`
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <span className='text-3xl mb-2'>{moodEmojis[option]}</span>
                <span className='capitalize'>{option}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className='space-y-3'>
            {question.options!.map((option) => (
              <button
                key={option}
                onClick={() => handleSingleSelect(option)}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  value === option
                    ? `${getMoodHighlightColor()} text-white`
                    : 'bg-white/10 hover:bg-white/20 text-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (question.type === 'multiple') {
    return (
      <div>
        <h2 className='text-3xl font-bold text-black mb-6'>{question.text}</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {question.options!.map((option) => (
            <button
              key={option}
              onClick={() => handleMultipleSelect(option)}
              className={`p-4 rounded-xl transition-all ${
                (value as string[])?.includes(option)
                  ? `${getMoodHighlightColor()} text-white`
                  : 'bg-white/10 hover:bg-white/20 text-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (question.type === 'slider') {
    const tempoIndex = question.options!.indexOf(value as string) || 2;
    return (
      <div>
        <h2 className='text-3xl font-bold text-black mb-6'>{question.text}</h2>
        <div className='space-y-4'>
          <input
            type='range'
            min='0'
            max={question.options!.length - 1}
            value={tempoIndex}
            onChange={handleSliderChange}
            className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer'
            style={{
              accentColor: getMoodHighlightColor().split(' ')[0],
            }}
          />
          <div className='flex justify-between text-gray-500 text-sm'>
            {question.options!.map((option) => (
              <span key={option}>{option}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (question.type === 'text') {
    return (
      <div>
        <h2 className='text-3xl font-bold text-black mb-6'>{question.text}</h2>
        <div className='space-y-4'>
          <div>
            <label className='block text-gray-300 mb-2'>Artists you love:</label>
            <input
              type='text'
              value={(value as { love: string; avoid: string })?.love || ''}
              onChange={(e) => handleTextChange('love', e.target.value)}
              className='w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:border-blue-500'
              placeholder='e.g., Taylor Swift, The Beatles'
            />
          </div>
          <div>
            <label className='block text-gray-300 mb-2'>Artists to avoid:</label>
            <input
              type='text'
              value={(value as { love: string; avoid: string })?.avoid || ''}
              onChange={(e) => handleTextChange('avoid', e.target.value)}
              className='w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:border-blue-500'
              placeholder='e.g., Kanye West'
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
}