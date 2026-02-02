'use client';
import Form from "next/form"
export const SearchForm = () => {

    return (
        <section>
            <h2>Search</h2>
            <Form action={'/search'}>
                <input type="search" name="term" /> 
                <div>
                    <input type="radio" name="field" id="author" value="author"/>
                    <label htmlFor="author">Author</label>            
                </div>
                <div>
                    <input type="radio" name="field" id="title" value="title"/>
                    <label htmlFor="title">Title</label>            
                </div>
                <input type="number" name="max_pages" />
                <label htmlFor="max_pages">Max Pages</label>
                <input type="number" name="min_pages" />
                <label htmlFor="min_pages">Min Pages</label>
                <button type="submit">Submit</button>
            </Form>
        </section>
    )
}