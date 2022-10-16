import { render, fireEvent, screen, cleanup} from '@testing-library/react';
import SearchArticles from '../frontend/src/components/searchArticles'
import { BrowserRouter as Route} from 'react-router-dom';

it("Search Article has data test id working", () => {
    const {container}= render(<SearchArticles dataTestId1="inputValueID" dataTestId2="buttonID" /> , {wrapper: Route});
    expect(screen.getByTestId('inputValueID')).toBeInTheDocument();
    const button = screen.getByTestId(container, "incrementButton");
    fireEvent.click(button);
    expect(screen.getByTestId('buttonID')).toBeInTheDocument();
});