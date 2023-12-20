'use server';

import { redirect } from 'next/navigation';
import { db } from '@/db';
import { revalidatePath } from 'next/cache';
export async function editSnippet(id: number, code: string) {
  await db.snippet.update({ where: { id }, data: { code } });

  // this updates the caching when editing is called, it will rerender so it can populate the latest data on the browser.
  revalidatePath(`/snippets/${id}`);
  // depending on the id it will be redirect the corresponding page.
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({ where: { id } });

  // this updates the caching with new data so when changes are made it will rerender then updated data on the browser.
  revalidatePath('/');
  // redirect the user back to home page
  redirect('/');
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    // check the user inputs and make sure they are valid
    // because we assigned "name" tags to our input elements so we have direct access to the value through formData.
    const title = formData.get('title');
    const code = formData.get('code');

    if (typeof title !== 'string' || title.length < 3) {
      return {
        message: 'Title must be longer',
      };
    }

    if (typeof code !== 'string' || code.length < 10) {
      return {
        message: 'Code must be longer',
      };
    }
    //create a new record in the database
    await db.snippet.create({
      data: { title, code },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return {
        message: 'Something went wrong',
      };
    }
  }

  // this updates the caching with new data so when changes are made,  it can show new updated data on the browser.
  revalidatePath('/');
  // redirect the user back to home page
  redirect('/');
}
