const byId = id => document.getElementById(id);
const form = byId('credentials');
const panel = byId('panel');
const feedback = byId('feedback');
const config = window.afterhoursConfig;
const client = config.projectUrl && config.publishableKey && window.supabase
  ? window.supabase.createClient(config.projectUrl, config.publishableKey)
  : null;
let registering = false;

function setMode(createAccount) {
  registering = createAccount;
  const title = registering ? 'Create account' : 'Log in';
  byId('account-title').textContent = title;
  byId('submit-account').textContent = title;
  byId('switch-mode').textContent = registering ? 'Use existing account' : 'Create an account';
  byId('game-field').hidden = !registering;
  form.elements.game.required = registering;
  form.elements.password.autocomplete = registering ? 'new-password' : 'current-password';
  form.elements.password.value = '';
  feedback.textContent = '';
}

byId('account').onclick = () => {
  panel.showModal();
  if (!client) {
    form.hidden = true;
    feedback.textContent = 'Account access is awaiting Supabase configuration.';
  }
};
byId('close').onclick = () => panel.close();
panel.onclose = () => { form.elements.password.value = ''; };
byId('switch-mode').onclick = () => setMode(!registering);

if (client) {
  client.auth.onAuthStateChange((event, session) => {
    const user = session?.user;
    byId('account').textContent = user ? 'My account' : 'Register / Login';
    byId('favourite').hidden = !user;
    byId('favourite').textContent = user ? 'Favourite game: ' + (user.user_metadata?.favourite_game || 'Unspecified') : '';
    form.hidden = Boolean(user);
    byId('logout').hidden = !user;
    if (user) {
      byId('account-title').textContent = 'My account';
      feedback.textContent = user.email;
      form.reset();
    } else if (event === 'SIGNED_OUT') {
      form.reset();
      setMode(false);
    }
  });
}

form.onsubmit = async event => {
  event.preventDefault();
  if (!client || byId('submit-account').disabled) return;
  const email = form.elements.email.value.trim();
  const password = form.elements.password.value;
  const game = form.elements.game.value.trim();
  if (registering && !game) {
    feedback.textContent = 'Enter your favourite game.';
    return;
  }
  byId('submit-account').disabled = byId('switch-mode').disabled = true;
  feedback.textContent = 'Please wait…';
  try {
    const result = registering
      ? await client.auth.signUp({email, password, options: {
          data: {favourite_game: game},
          emailRedirectTo: location.origin + location.pathname
        }})
      : await client.auth.signInWithPassword({email, password});
    if (result.error) throw result.error;
    if (result.data.session) panel.close();
    else {
      setMode(false);
      feedback.textContent = 'Check your email for a confirmation link, then log in.';
    }
  } catch (error) {
    feedback.textContent = error.message || 'Unable to connect. Please try again.';
  } finally {
    byId('submit-account').disabled = byId('switch-mode').disabled = false;
  }
};
byId('logout').onclick = async () => {
  try {
    const {error} = await client.auth.signOut({scope:'local'});
    if (error) throw error;
    panel.close();
  } catch (error) {
    feedback.textContent = error.message;
  }
};
