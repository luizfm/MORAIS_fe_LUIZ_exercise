import {getData} from 'api';

describe('Api fetcher test', () => {
  it('should render api response with provided path', async() => {
    global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
      json: jest.fn().mockReturnValue({data: {id: 1}}),
    }));
    const result = await getData('/teams');

    // Assert the result
    expect(result).toEqual({data: {id: 1}});
  });

  it('should return null when path is not provided or does not exist', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
      json: jest.fn().mockReturnValue(null),
    }));

    const result = await getData();

    expect(result).toBeNull();
  });
});