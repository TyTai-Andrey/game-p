const transformVersionToNumber = (version: string) => {
  const [major, minor, patch] = version.split(/\./).map(num => Number.parseInt(num, 10));

  return (major * 1000000) + (minor * 10000) + (patch * 100);
};

export default transformVersionToNumber;
