import React, { useState, useRef, useEffect } from 'react';

interface SixDigitInputProps {
    resetKey: { key: number; isError: boolean };
    onReset: (isError: boolean) => void;
    onSixDigitsEntered: (code: string) => void;
}

const SixDigitInput: React.FC<SixDigitInputProps> = ({ resetKey, onReset, onSixDigitsEntered }) => {
    const [inputValues, setInputValues] = useState<string[]>(['', '', '', '', '', '']);
    const [focused, setFocused] = useState<number | null>(null);

    const inputRefs = useRef<HTMLInputElement[]>([]);
    inputRefs.current = inputRefs.current.slice(0, 6);

    useEffect(() => {
        
        if (resetKey.isError) {
            inputRefs.current.forEach((input) => {
                if (input) input.disabled = true;
            });

            setTimeout(() => {
                onReset(false);
            }, 2000);
        } else {
            setInputValues(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();

            inputRefs.current.forEach((input) => {
                if (input) input.disabled = false;
            });
        }
    }, [resetKey, onReset]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.replace(/\D/g, '');

        if (value.length > 1) return;

        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);

        if (value.length === 1 && index < 5) {
            inputRefs.current[index + 1]?.focus();
        } else if (value.length === 1 && index === 5) {
            const code = newInputValues.join('');
            onSixDigitsEntered(code);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && inputValues[index] === '') {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '');

        if (pastedData.length !== 6) return;

        const newInputValues = pastedData.split('').slice(0, 6);
        setInputValues(newInputValues);
        onSixDigitsEntered(pastedData);
    };

    const handleFocus = (index: number) => {
        setFocused(index);
    };

    const handleBlur = () => {
        setFocused(null);
    };

    return (
        <div className="flex justify-center gap-4">
            {inputValues.map((value, index) => {
                const inputClass = `w-12 h-12 text-xl text-center border-b-4 focus:outline-none ${resetKey.isError ? 'border-red-500' : 'border-gray-500'
                    } ${index === focused && !resetKey.isError ? 'border-blue-500' : ''}`;

                return (
                    <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={value}
                        ref={(el) => (inputRefs.current[index] = el as HTMLInputElement)}
                        onChange={(e) => handleInputChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        onFocus={() => handleFocus(index)}
                        onBlur={handleBlur}
                        className={inputClass}
                        disabled={resetKey.isError}
                    />
                );
            })}
        </div>
    );
};

export default SixDigitInput;