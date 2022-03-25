async function homeService() {
  return { status: 200, message: 'teste' };
}

async function awayService() {
  return { status: 200, message: 'teste' };
}

export {
  homeService,
  awayService,
};
