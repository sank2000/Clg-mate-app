const devs = [
  {
    _id: 12,
    name: 'Krishna Moorthy',
    avatar: 'https://pbs.twimg.com/profile_images/1138865210687537152/0ZIM7rXG_400x400.jpg',
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
    note: `Once committed is done. Once promissed is held. Once learnt is kept.`,
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
