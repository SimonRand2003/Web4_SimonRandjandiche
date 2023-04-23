
import Link from 'next/link';
import styles from './Notes.module.css';
import CreateNote from './Create';

async function getMovies() {
    const res = await fetch('http://127.0.0.1:3000/movies', { cache: 'no-store' });
    const data = await res.json();
    return data?.items as any[];
}