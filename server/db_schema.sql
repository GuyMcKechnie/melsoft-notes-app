-- Create the notes table
create table notes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text,
  content text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table notes enable row level security;

-- Create Policy: Users can only see their own notes
create policy "Users can view their own notes"
on notes for select
using ( auth.uid() = user_id );

-- Create Policy: Users can insert their own notes
create policy "Users can insert their own notes"
on notes for insert
with check ( auth.uid() = user_id );

-- Create Policy: Users can update their own notes
create policy "Users can update their own notes"
on notes for update
using ( auth.uid() = user_id );

-- Create Policy: Users can delete their own notes
create policy "Users can delete their own notes"
on notes for delete
using ( auth.uid() = user_id );
