"use client"
import { useState } from "react";
import BookPage from "./Page";


export const bookPages = [
    {
        id: 0,
        front: "https://images.unsplash.com/photo-1767122374969-82c7acbbb4ed?q=80&w=400&auto=format&fit=crop",
        back: "https://images.unsplash.com/photo-1764617755316-ffb5ff87c2d7?q=80&w=400&auto=format&fit=crop",
    },
    {
        id: 1,
        front: "https://images.unsplash.com/photo-1767749559743-d2e4d8031d4f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        back: "https://images.unsplash.com/photo-1767700358934-3466f476d948?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 2,
        front: "https://images.unsplash.com/photo-1767517734918-d0969751b6b6?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        back: "https://images.unsplash.com/photo-1764377724372-d42fed3f442b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 3,
        front: "https://images.unsplash.com/photo-1767518782545-17fa47a602e2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        back: "https://plus.unsplash.com/premium_photo-1747851577288-c75149e91e1a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 4,
        front: "https://plus.unsplash.com/premium_photo-1666264200758-1c03db7f530c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        back: "https://images.unsplash.com/photo-1763906667544-02814d191864?q=80&w=709&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];


function BookCover(){
    const [isOpen, setIsOpen] = useState(false)
    function handleClick(){
        setIsOpen(true)
    }
    return <div onClick={handleClick} className={`book-3d shadow-lg flex items-center justify-center relative ${isOpen? 'book-open' : '' }`}>
        {
            bookPages.map((page,index)=>(
                <BookPage key={page.id} page={page} index={index} />
            ))
        }
    </div>
}

export default BookCover;