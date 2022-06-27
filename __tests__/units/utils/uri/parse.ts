import { parse } from '@utils/uri/parse';

test.each([
  {
    test: 'mereddit://oauth2redirect/reddit?a=true&b=thing#c=yes&d=no',
    expected: {
      fragment: new Map<string, string>([
        ['c', 'yes'],
        ['d', 'no'],
      ]),
      host: 'oauth2redirect',
      path: 'reddit',
      query: new Map<string, string>([
        ['a', 'true'],
        ['b', 'thing'],
      ]),
      scheme: 'mereddit',
    },
  },
  {
    test: 'https://www.reddit.com/r/linux',
    expected: {
      fragment: new Map(),
      host: 'www.reddit.com',
      path: 'r/linux',
      query: new Map(),
      scheme: 'https',
    },
  },
  {
    test: 'https://www.reddit.com/r/dev?verbose=v&verbose=vv&a=true',
    expected: {
      fragment: new Map(),
      host: 'www.reddit.com',
      path: 'r/dev',
      query: new Map<string, string>([
        ['verbose', 'vv'],
        ['a', 'true'],
      ]),
      scheme: 'https',
    },
  },
])(
  'Try parsing URI strings to an IUri object',
  ({test, expected}) => {
    expect(parse(test)).toStrictEqual(expected);
  }
);
