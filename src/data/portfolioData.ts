/**
 * =========================================================================
 * PLAYLIST_BGM — PORTFOLIO CONTENT & DATA CONFIGURATION
 * =========================================================================
 * You can easily edit all tracks, films, Instagram edits, and Letterboxd entries
 * below without touching the 3D rendering or UI code.
 *
 * Owner: Sarang RN (MCA Graduate)
 * Instagram: https://www.instagram.com/playlist_bgm/
 * Letterboxd: https://boxd.it/c3cfd
 * =========================================================================
 */

// Local generated high-fidelity asset fallbacks & artwork
import cinemaPosterImg from '../assets/images/cinema_poster_warm_1790179578032.jpg';
import albumCoverImg from '../assets/images/album_cover_ambient_1790179592558.jpg';
import sceneEditImg from '../assets/images/scene_edit_vertical_1790179607537.jpg';
import diaryCardImg from '../assets/images/diary_film_card_1790179620297.jpg';

export interface MusicItem {
  id: string;
  track: string;
  artist: string;
  mood: string;
  year: string;
  filmOrAlbum: string;
  quote?: string;
  personalNote: string;
  coverImage?: string;
  streamingUrl?: string;
}

export interface CinemaItem {
  id: string;
  title: string;
  director: string;
  year: string;
  genre: string;
  personalNote: string;
  favoriteScene: string;
  posterImage: string;
}

export interface InstagramEditItem {
  id: string;
  title: string;
  category: 'Cinema Edit' | 'Song Edit' | 'Movie Scene' | 'Aesthetic Clip';
  caption: string;
  audioTrack: string;
  thumbnailImage: string;
  instagramUrl: string;
  aspectRatio: string;
}

export interface LetterboxdItem {
  id: string;
  filmTitle: string;
  year: string;
  rating: number; // out of 5
  reviewExcerpt: string;
  watchedDate: string;
  letterboxdUrl: string;
  coverImage: string;
  rewatchCount: number;
}

export const OWNER_INFO = {
  brandName: 'PLAYLIST_BGM',
  tagline: 'Music • Cinema • Memories',
  subheading: 'A little corner for songs, scenes and everything in between.',
  curator: 'Sarang RN',
  qualification: 'MCA Graduate',
  instagramUrl: 'https://www.instagram.com/playlist_bgm/',
  letterboxdUrl: 'https://boxd.it/c3cfd',
  closingNote: 'Thanks for listening. Stay for the next scene.',
};

/**
 * -------------------------------------------------------------------------
 * 02 — MUSIC ITEMS
 * -------------------------------------------------------------------------
 */
export const musicItems: MusicItem[] = [
  {
    id: 'm1',
    track: 'In the Mood for Love (Yumeji\'s Theme)',
    artist: 'Shigeru Umebayashi',
    mood: 'Melancholic Elegance',
    year: '2000',
    filmOrAlbum: 'In the Mood for Love',
    quote: 'He remembers those vanished years. As though looking through a dusty window pane.',
    personalNote: 'The violins speak a language that words never could. Every repetition feels like an echo of a quiet longing.',
    coverImage: albumCoverImg,
  },
  {
    id: 'm2',
    track: 'Aga Naga',
    artist: 'A.R. Rahman',
    mood: 'Poetic Yearning',
    year: '2023',
    filmOrAlbum: 'Ponniyin Selvan',
    quote: 'Eyes that converse across rivers and dynasties.',
    personalNote: 'A gentle rhythm carrying the timeless aura of ancient longing. A staple for every twilight drive.',
    coverImage: albumCoverImg,
  },
  {
    id: 'm3',
    track: 'Experience',
    artist: 'Ludovico Einaudi',
    mood: 'Cathartic Crescendo',
    year: '2013',
    filmOrAlbum: 'In a Time Lapse',
    quote: 'The sensation of remembering everything you thought you lost.',
    personalNote: 'The quintessential soundtrack for editing memories together. Builds from a whisper into an overwhelming tide.',
    coverImage: albumCoverImg,
  },
  {
    id: 'm4',
    track: 'On the Nature of Daylight',
    artist: 'Max Richter',
    mood: 'Sorrowful Wonder',
    year: '2004',
    filmOrAlbum: 'Arrival / The Blue Notebooks',
    quote: 'Now that you know the story, would you still begin it?',
    personalNote: 'Whenever this plays in a film edit, it transforms a simple sequence into poetry.',
    coverImage: albumCoverImg,
  },
];

/**
 * -------------------------------------------------------------------------
 * 03 — CINEMA ITEMS
 * -------------------------------------------------------------------------
 */
export const cinemaItems: CinemaItem[] = [
  {
    id: 'c1',
    title: 'Before Sunrise',
    director: 'Richard Linklater',
    year: '1995',
    genre: 'Romance / Drama',
    favoriteScene: 'The listening booth sequence in the record shop.',
    personalNote: 'The magic of stolen time in Vienna. Two strangers talking until dawn, finding infinity in a single night.',
    posterImage: cinemaPosterImg,
  },
  {
    id: 'c2',
    title: 'Chungking Express',
    director: 'Wong Kar-wai',
    year: '1994',
    genre: 'Drama / Neo-Noir',
    favoriteScene: 'California Dreamin\' playing loudly at the Midnight Express snack bar.',
    personalNote: 'Pineapples with expiration dates, drenched neon lights, and the dizzying pace of modern loneliness healed by connection.',
    posterImage: cinemaPosterImg,
  },
  {
    id: 'c3',
    title: 'Kumbalangi Nights',
    director: 'Madhu C. Narayanan',
    year: '2019',
    genre: 'Drama / Family',
    favoriteScene: 'The quiet reflection by the backwaters as night turns to dawn.',
    personalNote: 'A film that lives in the soul. The delicate balance of broken brotherhood and warm redemption framed with breathtaking warmth.',
    posterImage: cinemaPosterImg,
  },
  {
    id: 'c4',
    title: 'Past Lives',
    director: 'Celine Song',
    year: '2023',
    genre: 'Drama / Romance',
    favoriteScene: 'The waiting for the cab under the gentle city streetlights.',
    personalNote: 'In-Yun — the concept of providence and past connections. Quietly devastating yet deeply comforting.',
    posterImage: cinemaPosterImg,
  },
];

/**
 * -------------------------------------------------------------------------
 * 04 — SCENES & EDITS (INSTAGRAM SHOWCASE)
 * -------------------------------------------------------------------------
 */
export const instagramItems: InstagramEditItem[] = [
  {
    id: 'ig1',
    title: 'Midnight Rain & Cinema Echoes',
    category: 'Cinema Edit',
    caption: 'When silence in cinema speaks louder than dialogue. A tribute to unsaid words in late-night scenes.',
    audioTrack: 'Ambient Tape Reverb • 48kHz',
    thumbnailImage: sceneEditImg,
    instagramUrl: 'https://www.instagram.com/playlist_bgm/',
    aspectRatio: '9:16',
  },
  {
    id: 'ig2',
    title: 'Train Windows & Departing Memories',
    category: 'Movie Scene',
    caption: 'There is something eternal about looking out of a moving train window while a melody plays in your headphones.',
    audioTrack: 'Slow Tempo Acoustic Drone',
    thumbnailImage: sceneEditImg,
    instagramUrl: 'https://www.instagram.com/playlist_bgm/',
    aspectRatio: '9:16',
  },
  {
    id: 'ig3',
    title: 'Golden Hour Monologues',
    category: 'Song Edit',
    caption: 'Soft sunlight falling across tired faces, matched with strings that feel like warm tea on an overcast afternoon.',
    audioTrack: 'Wong Kar-wai Inspired Cello Loop',
    thumbnailImage: sceneEditImg,
    instagramUrl: 'https://www.instagram.com/playlist_bgm/',
    aspectRatio: '9:16',
  },
  {
    id: 'ig4',
    title: 'Nostalgia in 35mm Frame Ratio',
    category: 'Aesthetic Clip',
    caption: 'Curated frames capturing the texture of celluloid and the weight of fleeting youth.',
    audioTrack: 'Lofi Tape Saturated Vinyl Hiss',
    thumbnailImage: sceneEditImg,
    instagramUrl: 'https://www.instagram.com/playlist_bgm/',
    aspectRatio: '9:16',
  },
];

/**
 * -------------------------------------------------------------------------
 * 05 — LETTERBOXD DIARY ENTRIES
 * -------------------------------------------------------------------------
 */
export const letterboxdItems: LetterboxdItem[] = [
  {
    id: 'lb1',
    filmTitle: 'In the Mood for Love',
    year: '2000',
    rating: 5,
    reviewExcerpt: 'A slow waltz through missed chances. The way dresses brush against walls, smoke curling up toward the ceiling.',
    watchedDate: 'Revisited Autumn 2024',
    letterboxdUrl: 'https://boxd.it/c3cfd',
    coverImage: diaryCardImg,
    rewatchCount: 7,
  },
  {
    id: 'lb2',
    filmTitle: 'Portrait of a Lady on Fire',
    year: '2019',
    rating: 5,
    reviewExcerpt: 'Do not regret. Remember. The visual symphony of gaze, silence, and the crackle of coastal bonfire.',
    watchedDate: 'Spring 2024',
    letterboxdUrl: 'https://boxd.it/c3cfd',
    coverImage: diaryCardImg,
    rewatchCount: 4,
  },
  {
    id: 'lb3',
    filmTitle: 'Aftersun',
    year: '2022',
    rating: 5,
    reviewExcerpt: 'Like watching a memory through a camcorder tape that you can never rewind enough to change the ending.',
    watchedDate: 'Winter 2023',
    letterboxdUrl: 'https://boxd.it/c3cfd',
    coverImage: diaryCardImg,
    rewatchCount: 3,
  },
  {
    id: 'lb4',
    filmTitle: 'Drive My Car',
    year: '2021',
    rating: 4.5,
    reviewExcerpt: 'Grief driving inside a red Saab 900 Turbo along the peaceful coastlines of Hiroshima.',
    watchedDate: 'Summer 2023',
    letterboxdUrl: 'https://boxd.it/c3cfd',
    coverImage: diaryCardImg,
    rewatchCount: 2,
  },
];

export const CHAPTERS = [
  { id: '01', key: 'home', title: 'PLAYLIST_BGM', subtitle: 'The Prelude' },
  { id: '02', key: 'music', title: 'MUSIC', subtitle: 'Resonant Notes' },
  { id: '03', key: 'cinema', title: 'CINEMA', subtitle: 'Screen Stories' },
  { id: '04', key: 'scenes', title: 'SCENES', subtitle: 'Instagram Vault' },
  { id: '05', key: 'letterboxd', title: 'LETTERBOXD', subtitle: 'Film Diary' },
  { id: '06', key: 'arrive', title: 'ARRIVE', subtitle: 'Credits & Horizon' },
];
