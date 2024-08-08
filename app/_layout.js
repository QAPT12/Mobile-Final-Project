import { Slot } from 'expo-router';
import NavBar from '../components/NavBar';
import { SQLiteProvider } from 'expo-sqlite';
import * as SQLite from 'expo-sqlite';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { StyleSheet } from 'react-native';

library.add(fab, fas);

export default function HomeLayout() {

    return (
        <SQLiteProvider databaseName='cards.db' onInit= { initializeDatabase } style={styles.HomeLayout}>
            <Slot />
            <NavBar />
        </SQLiteProvider>
    );
}

async function initializeDatabase() {
    const db = await SQLite.openDatabaseAsync('cards.db');
    await db.execAsync(`
        PRAGMA journal_mode = 'wal';
        CREATE TABLE IF NOT EXISTS cards (name TEXT PRIMARY KEY NOT NULL, imageLink TEXT NOT NULL, releaseSet TEXT NOT NULL, color TEXT NOT NULL);
    `);

    const result = await db.getAllAsync('SELECT * FROM cards');
    if (result.length == 0) {
        await db.runAsync(`INSERT INTO cards (name, releaseSet, color, imageLink) VALUES (?, ?, ?, ?)`, "Thoughtseize", "Lorwyn", "Black", "https://cards.scryfall.io/large/front/3/d/3df8c148-e87d-4043-9d8b-ec72bf8b6d5d.jpg?1562345371");
        await db.runAsync(`INSERT INTO cards (name, releaseSet, color, imageLink) VALUES (?, ?, ?, ?)`, "Smallpox", "Time Spiral", "Black", "https://cards.scryfall.io/large/front/1/7/175d5a88-2597-4e85-aed6-7a65c0595fb4.jpg?1562899952");
        await db.runAsync(`INSERT INTO cards (name, releaseSet, color, imageLink) VALUES (?, ?, ?, ?)`, "The Rack", "Antiquities", "Colorless", "https://cards.scryfall.io/large/front/e/c/ec0686ba-1277-4412-a397-7a6227808311.jpg?1562944784");
    }
}

const styles = StyleSheet.create({
    HomeLayout: {
        backgroundColor: '#3e3b4f',
    }
});