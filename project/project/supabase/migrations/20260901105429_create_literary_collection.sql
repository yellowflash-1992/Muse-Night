/*
# Create literary collection tables (single-tenant, no auth)

1. New Tables
- `literary_pieces` — stores all poems, prose pieces, and book entries
  - `id` (uuid, primary key)
  - `title` (text, not null) — title of the piece
  - `category` (text, not null) — 'poetry', 'prose', or 'book'
  - `body` (text, not null) — the full text content of the piece
  - `excerpt` (text) — short preview shown in cards
  - `author_name` (text, not null) — which of the two authors wrote it
  - `cover_color` (text) — gradient theme key for the card
  - `tags` (text[]) — optional tags for filtering
  - `published` (boolean, default true) — whether it's visible
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `literary_pieces`.
- Allow anon + authenticated CRUD because the data is intentionally shared/public (no-auth showcase site).
3. Seed Data
- 6 poems, 3 prose pieces, and 3 book excerpts from two authors: Elena Marsh and Theo Ashburn.
*/

CREATE TABLE IF NOT EXISTS literary_pieces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL CHECK (category IN ('poetry', 'prose', 'book')),
  body text NOT NULL,
  excerpt text,
  author_name text NOT NULL,
  cover_color text DEFAULT 'amber',
  tags text[] DEFAULT '{}',
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE literary_pieces ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_pieces" ON literary_pieces;
CREATE POLICY "anon_select_pieces" ON literary_pieces FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_pieces" ON literary_pieces;
CREATE POLICY "anon_insert_pieces" ON literary_pieces FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_pieces" ON literary_pieces;
CREATE POLICY "anon_update_pieces" ON literary_pieces FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_pieces" ON literary_pieces;
CREATE POLICY "anon_delete_pieces" ON literary_pieces FOR DELETE
  TO anon, authenticated USING (true);

-- Seed data: poetry
INSERT INTO literary_pieces (title, category, body, excerpt, author_name, cover_color, tags) VALUES
('Whispers of Dawn', 'poetry', 'Before the sun forgets the night,
I gather stars in open hands—
they melt like snow upon my skin,
they drip like honey through my fingers.

The horizon wears a golden thread,
stitched tight against the dark.
I watch it pull the morning close,
a zipper closing up the sky.

And in the hush before the birds,
I hold my breath and listen—
somewhere, someone else is waking,
somewhere, someone else begins.',
'A meditation on first light and the shared silence of early morning.', 'Elena Marsh', 'amber', ARRAY['nature', 'morning', 'contemplative']),

('The Weight of Rivers', 'poetry', 'I once believed that water had no memory—
that rivers carried nothing but themselves.
But standing here, knee-deep in current,
I feel the cold press of a thousand names.

Each drop has held a different sky,
each ripple carries someone''s reflection.
The river does not choose what it remembers;
it only moves, and moving, keeps.',
'A reflection on memory and the relentless motion of water.', 'Elena Marsh', 'teal', ARRAY['nature', 'memory', 'water']),

('Fragments', 'poetry', 'I keep your voice in pieces—
a syllable behind the door,
a laugh caught in the curtain''s fold,
half a sentence on the stair.

I do not try to assemble you.
Some things are better held in shards:
a mosaic no one steps on,
a pattern only I can see.',
'A poem about holding onto someone through fragments of memory.', 'Theo Ashburn', 'rose', ARRAY['memory', 'loss', 'love']),

('Static', 'poetry', 'Between the radio stations
there is a frequency that sounds
like the ocean inside a shell—
like static, like breath, like the hum
of a refrigerator at 3 a.m.

I have started to prefer it
to music. It does not lie.
It does not try to mean.
It simply fills the room
the way grief does—
evenly, without opinion.',
'A short piece about the comfort found in noise and silence.', 'Theo Ashburn', 'slate', ARRAY['silence', 'grief', 'modern']),

('Letter to a Moth', 'poetry', 'You came in through the window
like a small piece of the night
had broken off and learned to flutter.

I turned off every lamp for you.
I sat in the dark and listened
to your soft collision with the ceiling—
the sound of wanting
without knowing what you want.

We are the same, you and I.
We orbit things we cannot name.
We are drawn to light we cannot touch.
We burn, and call it living.',
'A poem drawing a parallel between a moth''s instinct and human longing.', 'Elena Marsh', 'blue', ARRAY['nature', 'longing', 'metaphor']),

('Inheritance', 'poetry', 'My grandmother''s hands were maps
of every place she''d ever been—
the knuckles were small mountains,
the veins were rivers she never saw.

She gave me her hands without the map.
I hold them up to the light sometimes
and try to read the route she took—
but the legend is in a language
I was never taught to speak.',
'A poem about the things passed down through generations.', 'Theo Ashburn', 'amber', ARRAY['family', 'memory', 'identity']),

('The Cartographer''s Confession', 'prose', 'I have drawn the edges of the world
and called them borders.
I have named the mountains
as though they asked for names.
I have measured rivers
and declared them mine—
as if water could be owned
by the one who writes the map.

Forgive me. I believed
that naming was the same as knowing.
I believed that lines on paper
could hold the wind.',
'A confession from an imagined mapmaker about the limits of naming.', 'Theo Ashburn', 'teal', ARRAY['identity', 'borders', 'nature']),

('The Last Bookstore', 'prose', 'It was on a street that no longer exists—not on any map, at least, not on the ones they print now. The sign above the door was hand-painted, the letters slightly crooked, as though the painter had been interrupted by rain. Inside, the shelves were not arranged by genre or author. They were arranged by feeling.

"Where is your fiction section?" I asked the old man behind the counter.

He looked up from a book he was reading with a magnifying glass and said, "Every shelf is fiction, child. The question is what kind of fiction you need today."

I wandered for what felt like hours. I found a shelf labeled "For when you cannot sleep" and another labeled "For when you are angry at someone you love." There was a small section near the window marked simply "For trains." I pulled a book from it and read the first page. It was about a man watching fields pass from a window. That was all. It was enough.

I bought three books. The old man wrapped them in brown paper and tied them with string. He did not ask for money. He asked for a promise.

"Come back," he said. "Not to this place. This place won''t be here. But come back to reading. Come back to the habit of sitting with a page and letting it change you."

I said I would. I have. I do.',
'A short story about a mysterious bookstore arranged by emotion rather than genre.', 'Elena Marsh', 'rose', ARRAY['story', 'books', 'memory']),

('Salt', 'prose', 'My mother kept a jar of salt on the windowsill. Not for cooking—she had a different jar for that, in the cabinet, with a lid that didn''t quite close. This jar was open. It sat beside the basil plant and the cracked porcelain bird, and she never explained it.

I asked her once. She said, "Salt remembers the sea." I didn''t understand. She said, "It pulls the water from the air. Watch it on a humid day—it gets damp. It knows where it came from."

When she died, I took the jar. I set it on my own windowsill, between a dead orchid and a photograph of nothing in particular. On the worst days, I watch the salt. On the good days, I forget it''s there.

I think what she meant was that some things carry their origin inside them, no matter where you put them. That a thing can be small and ordinary and still hold an entire ocean in its memory. That you can take something from where it belongs and it will spend its whole life reaching back.

The jar is still damp in the mornings. I take that as proof.',
'A personal essay about grief, memory, and a jar of salt.', 'Theo Ashburn', 'amber', ARRAY['essay', 'grief', 'family']),

('The Lighthouse Keeper''s Daughter', 'book', 'Chapter One: The Light

She was born in the month the light first turned. Her father said it was a coincidence—the lighthouse had been waiting for a new bulb for six weeks, and it arrived on the same morning she did. But her mother said the light had been waiting for her. "Some things know what they''re for," her mother said, "before anyone else does."

She grew up in the tower. She learned to count by the rotations of the beam. She learned the names of ships by their lights—the red one, the green one, the one that blinked in threes. She knew every current, every rock, every patch of fog that rolled in like a curtain at the end of a play.

When she was eleven, a ship went down. She heard it before she saw it—the grinding of hull against reef, a sound like the earth clearing its throat. Her father was already in the lantern room, turning the beam, but the fog was too thick. The light hit the wall of white and stopped.

After that, she stopped sleeping. She sat in the lantern room every night, watching. Her father said the sea would take what it wanted. She said, "Then I''ll make it work harder."

Chapter Two: The Keeper

By sixteen, she was the keeper in all but name. Her father''s hands had begun to shake—not badly, not yet, but enough that the lens needed cleaning twice where once was enough. She climbed the stairs with him. She lit the wick. She turned the mechanism by hand when the clockwork wound down.

The inspectors came once a year. They never asked her name. They asked her father if the light was in good order. He said yes. They wrote it down. They left.

She wondered, sometimes, what it would take for them to see her. Not as a daughter. Not as a helper. As the keeper. She decided it would take a storm. Not a small one. One that would test every bolt and every beam and every nerve. One that would prove what she already knew.

She did not have to wait long.',
'The opening chapters of a novel about a girl who grows up in a lighthouse and fights to be seen.', 'Elena Marsh', 'blue', ARRAY['novel', 'sea', 'coming-of-age']),

('The Year Without Summer', 'book', 'Prologue

In 1816, the sun did not come. Or rather, it came, but it came thin—like a rumor of itself, like a candle behind a cloth. The ash from a volcano no one had heard of had circled the earth and dimmed the light, and the summer that year was a season of cold rain and gray skies and crops that rotted in the fields.

Mary Shelley was eighteen. She was in Switzerland, in a house on a lake, with a man she was not married to and a baby she was not sure she could keep alive. The weather trapped them indoors. They read ghost stories. They dared each other to write one.

She wrote about a man who could not accept death. Who built a creature from pieces of the dead and brought it to life and then ran from what he had made. She wrote about the thing we have been writing about ever since: the moment when what we create turns and looks at us, and we cannot look away.

This is not that story. This is the story of the year that made it possible. The year the sun went away and someone sat in the dark and asked, "What if the dark is where the best ideas come from?"

Part One: The House

Byron rented the house. He always rented the houses. He had money and restlessness and a habit of collecting people the way other people collect books. He collected Mary and Shelley and Polidori and a few others, and he put them all in a house by a lake and waited to see what would happen.

What happened was rain. What happened was boredom. What happened was the kind of long, close, desperate conversation that only happens when people are trapped together and the world outside is wrong. They talked about life and death and electricity and whether the dead could be brought back. They talked as though talking could save them from the weather.

Mary listened. She did not say much. She was writing something down.',
'The opening of a historical novel about the summer Mary Shelley wrote Frankenstein.', 'Theo Ashburn', 'slate', ARRAY['novel', 'historical', 'literary']),

('Small Towns and Other Universes', 'book', 'Introduction

Every small town is a universe. It has its own physics—the way people move through it, the gravity of the diner, the repulsion of the abandoned mill. It has its own time, which is slower and more circular than city time. It has its own weather, which is always more dramatic than the weather on the news, because it is happening to people you know.

I grew up in a town of two thousand people. We had one traffic light, and it was a point of pride that it was only a blinking yellow. We had a library that was open on Tuesdays and Thursdays and by appointment, which meant if you knew the librarian, which everyone did. We had a lake that was either a lake or a pond, depending on who you asked, and the answer told you everything about the person.

This book is about that town, and about every town like it. It is about the people who stay and the people who leave and the people who come back and the people who mean to come back and never do. It is about the stories that are too small for novels and too large for conversations. The stories that live in the space between the diner and the church, between the school and the grain elevator, between what people say and what they mean.

I have been collecting these stories my whole life. I have changed the names. I have changed the details. I have not changed the truth.

Chapter One: The Diner

It was called the Bluebird, but it was not blue. It was brown. It had been brown for as long as anyone could remember, and no one could explain the name. The owner, a man named Gus who had inherited it from his father, said the name was a family secret. "My grandfather named it," he said. "He was colorblind or a liar. Either way, it stuck."

Everyone in town came to the Bluebird eventually. Not every day—some people came once a year, on their way through. But if you lived in that town long enough, you sat at the counter and you drank the coffee and you ate whatever Gus told you to eat, because the menu was a suggestion and Gus was a fate.',
'A collection of essays and stories about life in a small town.', 'Theo Ashburn', 'teal', ARRAY['essays', 'small-town', 'stories'])
ON CONFLICT DO NOTHING;