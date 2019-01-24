import React from 'react';
import { Query } from 'react-apollo';

const List = ({ query, TestComponent }) => (
  <Query query={query}>
    {({ loading, error, fetchMore, data: { industries } }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error}`;

      return (
        <React.Fragment>
          <TestComponent
            data={industries}
            fetchMore={fetchMore}
          />

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>

            <tbody>
              {industries.list.map((industry, index) => (
                <tr key={index}>
                  <td>{industry.id}</td>
                  <td>{industry.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </React.Fragment>
      )
    }}
  </Query>
);

export default List;
