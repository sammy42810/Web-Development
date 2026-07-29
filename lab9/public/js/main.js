(function () {
  const form = document.getElementById('password_form');
  const errorMessage = document.getElementById('error_message');
  const results = document.getElementById('results');

  const hasSequentialLetters = (password) => {
    const lower = password.toLowerCase();
    for (let i = 0; i < lower.length - 2; i++) {
      const a = lower.charCodeAt(i);
      const b = lower.charCodeAt(i + 1);
      const c = lower.charCodeAt(i + 2);
      const isAlpha = (code) => code >= 97 && code <= 122;
      if (isAlpha(a) && isAlpha(b) && isAlpha(c) && b === a + 1 && c === b + 1) {
        return true;
      }
    }
    return false;
  };

  const hasSequentialNumbers = (password) => {
    for (let i = 0; i < password.length - 2; i++) {
      const a = password.charCodeAt(i);
      const b = password.charCodeAt(i + 1);
      const c = password.charCodeAt(i + 2);
      const isDigit = (code) => code >= 48 && code <= 57;
      if (isDigit(a) && isDigit(b) && isDigit(c) && b === a + 1 && c === b + 1) {
        return true;
      }
    }
    return false;
  };

  const analyzePassword = (password) => {
    const length = password.length;
    let uppercase = 0;
    let lowercase = 0;
    let digits = 0;
    let special = 0;
    const charCounts = {};

    for (const char of password) {
      if (/[A-Z]/.test(char)) uppercase++;
      else if (/[a-z]/.test(char)) lowercase++;
      else if (/[0-9]/.test(char)) digits++;
      else special++;

      charCounts[char] = (charCounts[char] || 0) + 1;
    }

    const uniqueChars = Object.keys(charCounts).length;
    const repeatedChars = Object.values(charCounts).filter((count) => count > 1).length;

    const sequentialLetters = hasSequentialLetters(password);
    const sequentialNumbers = hasSequentialNumbers(password);

    let score = 0;
    if (length >= 12) score += 2;
    else if (length >= 8) score += 1;

    if (uppercase > 0) score += 1;
    if (lowercase > 0) score += 1;
    if (digits > 0) score += 1;
    if (special > 0) score += 1;
    if (sequentialLetters || sequentialNumbers) score -= 1;

    let strength;
    if (score <= 2) strength = 'Weak';
    else if (score <= 4) strength = 'Moderate';
    else strength = 'Strong';

    return {
      originalPassword: password,
      length,
      uppercase,
      lowercase,
      digits,
      special,
      uniqueChars,
      repeatedChars,
      sequentialLetters,
      sequentialNumbers,
      strength
    };
  };

  const renderStats = (stats) => {
    const dl = document.createElement('dl');

    const entries = [
      ['Original Password', stats.originalPassword],
      ['Length', stats.length],
      ['Uppercase Letters', stats.uppercase],
      ['Lowercase Letters', stats.lowercase],
      ['Digits', stats.digits],
      ['Special Characters', stats.special],
      ['Unique Characters', stats.uniqueChars],
      ['Repeated Characters', stats.repeatedChars],
      ['Contains Sequential Letters', stats.sequentialLetters],
      ['Contains Sequential Numbers', stats.sequentialNumbers],
      ['Password Strength', stats.strength]
    ];

    for (const [title, value] of entries) {
      const dt = document.createElement('dt');
      dt.textContent = title;
      const dd = document.createElement('dd');
      dd.textContent = String(value);
      dl.appendChild(dt);
      dl.appendChild(dd);
    }

    results.appendChild(dl);
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    errorMessage.textContent = '';

    const password = document.getElementById('password_input').value;

    if (!password) {
      errorMessage.textContent = 'Error: please enter a password before submitting.';
      return;
    }

    const stats = analyzePassword(password);
    renderStats(stats);
    form.reset();
  });
})();
