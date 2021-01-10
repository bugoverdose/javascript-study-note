/*
  몇번째 매개변수인지 순서가 중요한 경우, 마음대로 인자들 지워버릴 수는 없음   
  사용하지 않는 인자들의 경우 full 명칭을 그대로 넣지 않고, _, __,처럼 값을 주기.
  => 
*/

export const githubLoginCallBack = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const {
    _json: { id, avatar_url, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
  } catch (error) {
    return cb(error);
  }
};

export const githubLoginCallBack = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
  } catch (error) {
    return cb(error);
  }
};
