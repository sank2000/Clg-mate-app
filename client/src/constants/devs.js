const devs = [
  {
    _id: 12,
    name: 'Krishna Moorthy',
    avatar: 'https://avatars2.githubusercontent.com/u/41967554?s=400&u=69dc07ff57f177df9ca1751df8e9f9028d46fc74&v=4',
    role: 'Full Stack Developer',
    email: 'akrishnamoorthy007@gmail.com',
    social: {
      github: 'https://www.github.com/KrishnaMoorthy12',
      slack: '',
      twitter: 'https://www.twitter.com/12KrishnaMurty',
      instagram: '',
      facebook: 'https://www.facebook.com/akrishnamoorthy007',
      telegram: ''
    },
    note: `People satisfy conditions to solve problems, Programmers are people who also exploit the conditions.`,
    website: 'https://www.about.me/akrishnamoorthy007',
    choices: ['github', 'twitter']
  },
  {
    _id: 8,
    name: 'Santhosh',
    avatar: 'https://pbs.twimg.com/profile_images/1261214612017430528/sjlqsZuV_400x400.jpg',
    role: 'Full Stacker',
    email: 'santhoshvelr@gmail.com',
    social: {
      github: 'https://www.github.com/sank2000',
      slack: '',
      twitter: '',
      instagram: 'https://www.instagram.com/santhoshvelr/?hl=en',
      facebook: '',
      telegram: ''
    },
    note: 'Everybody Should learn how to program a Computer Because it teaches you how to Think..',
    website: 'https://sank2000.github.io/Personal_html/',
    choices: ['github, instagram']
  }
];

const shuffledDevs = function () {
  const randomIndex = Math.round(Math.random());
  return [devs[randomIndex], devs[Number(!(randomIndex))]];
}();

module.exports = { devs, shuffledDevs }
