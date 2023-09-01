
/**
 * Please, improve this component and fix all problems.
 *
 * What is important:
 * - design (extensibility, testability)
 * - code cleanliness, following best practices
 * - bugs
 * - consistency
 * - naming
 * - formatting
 *
 * Write your perfect code!
 */

import React, { useEffect, useState } from 'react';

export function Card({
    title,
    text,
    target,
    linkTitle,
    href,
    rel,
    onClick,
    linkClassName
}) {
    return (
        <div className="card">
            <div className="card__title">{title}</div>
            <div className="card__text">{text}</div>
            <a
                className={`default-link card__link ${linkClassName}`}
                target={target}
                rel={rel}
                href={href}
                onClick={onClick}
            >
                {linkTitle}
            </a>
        </div>
    );
}

export function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substr(0, maxLength) + '...';
    }
    return text;
}

export function cardData(item) {
    return {
        id: item.id,
        title: item.title,
        link_title: item.link_title,
        link: item.link,
        text: truncateText(item.text, 50)
    };
}

export default function Page() {
    const [cards, setCards] = useState < [] > ([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                'https://my-json-server.typicode.com/savayer/demo/posts'
            );
            const jsonData = await response.json();
            const newData = jsonData.map(cardData);
            setCards(newData);
        }

        fetchData();
    }, []);

    function analyticsTrackClick(url) {
        console.log(url);// sending clicked link url to analytics
    }

    return (
        <div>
            {cards.map((item) => (
                <Card
                    key={item.id}
                    title={item.title}
                    linkTitle={item.link_title}
                    href={item.link}
                    text={item.text}
                    linkClassName={item.id === 1 ?? 'card__link--red'}
                    target={item.id === 1 ?? '_blank'}
                    onClick={() => analyticsTrackClick(item.link)}
                />
            ))}
        </div>
    );
}
