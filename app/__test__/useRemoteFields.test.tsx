import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import FormFeed from '../components/molecules/dynamicForm/feedForm/FormFeed';
import { Providers } from '../store/provider/provider';

// Mock the router for your test
jest.mock('next/router', () => require('next-router-mock'));

describe('should render feed programatically', () => {
    it('renders form', () => {
        const comp = render(
            <Providers>
                <FormFeed />
            </Providers>
        )
        expect(screen.getByText('Hi, this form is dynamic like a feed')).toBeInTheDocument();
    });
   
})

describe('should send the form', () => {
    it('handles form submission', () => {
        render(
          <Providers>
            <FormFeed />
          </Providers>
        );
        const submitButton = screen.getByTestId('submitTestId');
        fireEvent.click(submitButton);
      });
})


