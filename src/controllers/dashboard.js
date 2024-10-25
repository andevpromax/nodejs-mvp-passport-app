const dashboardView = async (req, res) => {
  try {
    const user = await req.user;
    res.render('dashboard', { name: user.name });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Error loading dashboard');
  }
};

export default {
  dashboardView,
};
