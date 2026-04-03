export const currentUser = {
  id: '0',
  name: 'Retha Bile',
  avatar: require('../../assets/mpho.jpg'),
  cover: 'https://picsum.photos/800/300',
  bio: 'Software Engineering Student 💻 | Limkokwing University',
  friends: 832,
};

export const initialPosts = [
  {
    id: '1',
    username: 'Hoatiti-Knews',
    time: '1h',
    avatar: require('../../assets/news.png'),
    content: "Let's hear\n\n#Dating #humorviral\n\nGuys what do you do when a girl you asked out on a date shows up with her friend?",
    image: null,
    likes: 245,
    comments: 89,
    shares: 34,
    liked: false,
  },
  {
    id: '2',
    username: 'Travel Vibes',
    time: '2h',
    avatar: require('../../assets/travel.jpg'),
    content: 'Beautiful sunset from the mountains today 🌄',
    image: 'https://picsum.photos/seed/travel/400/300',
    likes: 512,
    comments: 43,
    shares: 21,
    liked: false,
  },
  {
    id: '3',
    username: 'T Man',
    time: '3h',
    avatar: require('../../assets/TMan.jpg'),
    content: 'Enjoying the view from the top! 🏔️',
    image: 'https://picsum.photos/seed/mountain/400/300',
    likes: 134,
    comments: 22,
    shares: 8,
    liked: false,
  },
  {
    id: '4',
    username: 'CG Trader',
    time: '3h',
    avatar: require('../../assets/cg.png'),
    content: 'Explore 2M+ 3D models online for print, game!',
    image: null,
    likes: 134,
    comments: 22,
    shares: 8,
    liked: false,
  },
  {
    id: '5',
    username: 'T Man',
    time: '3h',
    avatar: require('../../assets/TMan.jpg'),
    content: 'Enjoying the view from the top! 🏔️',
    image: 'https://picsum.photos/seed/mountain/400/300',
    likes: 134,
    comments: 22,
    shares: 8,
    liked: false,
  },
];

export const allUsers = [
  { id: '1', name: 'Fissy Malie', avatar: require('../../assets/mpho.jpg'), mutualFriends: 5 },
  { id: '2', name: 'Halls LS', avatar: require('../../assets/girl.jpg'), mutualFriends: 3 },
  { id: '3', name: 'Travel Vibes', avatar: require('../../assets/travel.jpg'), mutualFriends: 8 },
  { id: '4', name: 'Hoatiti Knews', avatar: require('../../assets/news.png'), mutualFriends: 2 },
  { id: '5', name: 'Mpho Mokoena', avatar: require('../../assets/mokoena.jpg'), mutualFriends: 6 },
  { id: '6', name: 'Sarah Dlamini', avatar: 'https://randomuser.me/api/portraits/women/5.jpg', mutualFriends: 1 },
  { id: '7', name: 'Thabo Nkosi', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', mutualFriends: 4 },
];

export const initialNotifications = [
  { id: '1', avatar: require('../../assets/mpho.jpg'), text: 'Fissy Malie liked your post.', time: '2m ago', unread: true },
  { id: '2', avatar: require('../../assets/girl.jpg'), text: 'Halls LS commented: "Looks great!"', time: '15m ago', unread: true },
  { id: '3', avatar: require('../../assets/mokoena.jpg'), text: 'Mpho LS shared your post.', time: '1h ago', unread: false },
  { id: '4', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', text: 'Thabo tagged you in a post.', time: '3h ago', unread: false },
  { id: '5', avatar: 'https://randomuser.me/api/portraits/women/5.jpg', text: 'Sarah reacted to your comment.', time: '5h ago', unread: false },
];

export const stories = [
  { id: '1', name: 'Music', isMusic: true },
  { id: '2', name: 'Create Story', isCreate: true },
  { id: '3', name: 'Mpho LS', image: require('../../assets/mokoena.jpg'), badge: 1 },
  { id: '4', name: 'Masentle', image: require('../../assets/story.jpg') },
  { id: '5', name: 'Nthaby', image: require('../../assets/ntha.jpeg'), },
  { id: '6', name: 'Morapeli', image: require('../../assets/TMan.jpg'), },
  { id: '7', name: 'Thabo', image: require('../../assets/travel.jpg'), },
];