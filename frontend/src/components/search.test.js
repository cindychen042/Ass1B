import React from 'react';
import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import SearchArticles from './searchArticles'
import { BrowserRouter as Route} from 'react-router-dom';

//unit testing for frontend

describe("SearchArticle.js", () => {
    it("Search Article has data test id working", () => {
        render(<SearchArticles dataTestId1="inputValueID" dataTestId2="buttonID" /> , {wrapper: Route});
        expect(screen.getByTestId('inputValueID')).toBeInTheDocument();
        expect(screen.getByTestId('buttonID')).toBeInTheDocument();
        expect(screen.queryByTestId('nonexistentialID')).not.toBeInTheDocument();
    });

    it("input value initialize to null or has an empty value", () => {
        render(<SearchArticles dataTestId1="inputValueID" dataTestId2="buttonID" /> , {wrapper: Route});
        expect(screen.getByDisplayValue('')).toHaveAttribute('value');
        expect(screen.queryByDisplayValue('not an empty field')).not.toBeTruthy();
    });


});
