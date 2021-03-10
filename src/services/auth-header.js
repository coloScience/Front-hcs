export default function authHeader(login) {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    return {
      login: login,
      role: user.roles,
      Authorization: 'Bearer ' + user.accessToken,
      'x-access-token': user.accessToken
    };
  } else {
    return {};
  }
}
