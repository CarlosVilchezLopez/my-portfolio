import { getConsent, setConsent } from './analytics';

beforeEach(() => localStorage.clear());

test('has no consent until the visitor chooses', () => {
  expect(getConsent()).toBeNull();
  localStorage.setItem('analytics-consent', 'something else');
  expect(getConsent()).toBeNull();
});

test('declining disables Analytics and deletes its cookies', () => {
  document.cookie = '_ga=GA1.1.123; path=/';
  document.cookie = '_ga_FZ0T8783H8=GS1.1.456; path=/';
  document.cookie = 'other=keep; path=/';

  setConsent('denied');

  expect(getConsent()).toBe('denied');
  expect(window['ga-disable-G-FZ0T8783H8']).toBe(true);
  expect(document.cookie).not.toContain('_ga');
  expect(document.cookie).toContain('other=keep');
});
