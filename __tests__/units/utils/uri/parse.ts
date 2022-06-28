import { parse } from '@utils/uri/parse';

test.each([
  {
    test: 'mereddit://oauth2redirect/reddit?a=true&b=thing#c=yes&d=no',
    expected: {
      fragment: [
        ['c', 'yes'],
        ['d', 'no'],
      ],
      host: 'oauth2redirect',
      path: 'reddit',
      query: [
        ['a', 'true'],
        ['b', 'thing'],
      ],
      scheme: 'mereddit',
    },
  },
  {
    test: 'https://www.reddit.com/r/linux',
    expected: {
      fragment: [],
      host: 'www.reddit.com',
      path: 'r/linux',
      query: [],
      scheme: 'https',
    },
  },
  {
    test: 'https://www.reddit.com/r/dev?verbose=v&verbose=vv&a=true',
    expected: {
      fragment: [],
      host: 'www.reddit.com',
      path: 'r/dev',
      query: [
        ['a', 'true'],
        ['verbose', 'v'],
        ['verbose', 'vv'],
      ],
      scheme: 'https',
    },
  },
])(
  'Try parsing URI strings to an IUri object',
  ({test, expected}) => {
    expect(parse(test)).toStrictEqual(expected);
  }
);
