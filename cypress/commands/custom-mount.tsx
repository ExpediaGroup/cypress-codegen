import * as React from 'react';

export const customMount = (Component: React.ReactElement) => {
    cy.mount(
        <div>
            <Component />
        </div>
    );
};

declare global {
    namespace Cypress {
        interface Chainable {
            customMount(Component: React.ReactElement): Chainable;
        }
    }
}
