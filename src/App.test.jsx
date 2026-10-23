import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.className = '';
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('shows the name and role in the hero', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: 'Carlos Vilchez' })).toBeInTheDocument();
  expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
});

test('reads the ERP badge as a whole sentence for screen readers', () => {
  render(<App />);
  expect(screen.getByText('Yahasystem ERP is used by 50+ companies in Panama')).toHaveClass('sr-only');
});

// Con tiempo real: los temporizadores falsos de Vitest dejan bloqueado el bucle de animación de Motion
// para las pruebas siguientes
test('replays the tagline with the typing sound and stops it at the end', async () => {
  const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
  const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
  const user = userEvent.setup();
  const { unmount } = render(<App />);

  await user.click(screen.getByRole('button', { name: 'Replay with sound' }));
  expect(play).toHaveBeenCalledTimes(1);
  expect(pause).not.toHaveBeenCalled();

  await waitFor(() => expect(pause).toHaveBeenCalled(), { timeout: 5000 });
  unmount();
}, 10000);

test('switches to Spanish and remembers the choice', async () => {
  const user = userEvent.setup();
  const { unmount } = render(<App />);

  await user.click(screen.getByRole('button', { name: /Español/ }));
  expect(screen.getByRole('heading', { level: 2, name: 'Sobre mí' })).toBeInTheDocument();
  expect(document.documentElement.lang).toBe('es');

  unmount();
  render(<App />);
  expect(screen.getByRole('heading', { level: 2, name: 'Sobre mí' })).toBeInTheDocument();
});

test('toggles dark mode', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole('button', { name: 'Switch to dark mode' }));
  expect(document.documentElement).toHaveClass('dark');
  expect(localStorage.getItem('theme')).toBe('dark');
});

test('opens and closes the project details', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getAllByRole('button', { name: /View details/ })[0]);
  const dialog = screen.getByRole('dialog', { name: 'Yahasystem ERP' });
  expect(dialog).toHaveAttribute('open');
  expect(within(dialog).getByText(/adopted by over 50 companies in Panama/)).toBeInTheDocument();

  await user.click(within(dialog).getByRole('button', { name: 'Close' }));
  expect(dialog).not.toHaveAttribute('open');
});

test('links to the email address and to no empty pages', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /carlosvilchezlopez@gmail\.com/ })).toHaveAttribute(
    'href',
    'mailto:carlosvilchezlopez@gmail.com'
  );
  for (const link of screen.getAllByRole('link')) {
    expect(link.getAttribute('href')).not.toBe('#');
  }
});

test('asks for cookie consent once and lets the visitor change it from the footer', async () => {
  const user = userEvent.setup();
  const { unmount } = render(<App />);

  const banner = screen.getByRole('region', { name: 'Cookies' });
  await user.click(within(banner).getByRole('button', { name: 'Decline' }));
  expect(localStorage.getItem('analytics-consent')).toBe('denied');
  await waitFor(() => expect(screen.queryByRole('region', { name: 'Cookies' })).not.toBeInTheDocument());

  unmount();
  render(<App />);
  expect(screen.queryByRole('region', { name: 'Cookies' })).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Cookies' }));
  const reopened = screen.getByRole('region', { name: 'Cookies' });
  expect(within(reopened).getByRole('button', { name: 'Accept' })).toHaveFocus();
  await user.click(within(reopened).getByRole('button', { name: 'Accept' }));
  expect(localStorage.getItem('analytics-consent')).toBe('granted');
});
