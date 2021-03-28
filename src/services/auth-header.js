export default function authHeader(props) {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    return {
      props: JSON.stringify(props),
      role: user.roles,
      Authorization: 'Bearer ' + user.accessToken,
      'x-access-token': user.accessToken
    };
  } else {
    return {};
  }
}
