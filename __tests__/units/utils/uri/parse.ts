import { IUri, parse } from '@utils/uri/parse';

test('parse function for url containing all parts', () => {
  const test: string = 'mereddit://oauth2redirect/reddit?a=true&b=thing#c=yes&d=no';

  const results: IUri = parse(test);

  expect(results).toStrictEqual({
    fragment: new Map<string, string | Array<string>>([
      ['c', 'yes'],
      ['d', 'no'],
    ]),
    host: 'oauth2redirect',
    path: 'reddit',
    query: new Map<string, string | Array<string>>([
      ['a', 'true'],
      ['b', 'thing'],
    ]),
    scheme: 'mereddit',
  });
});

test('parse a reddit web address', () => {
  const test: string = 'https://www.reddit.com/r/linux';

  const results: IUri = parse(test);

  expect(results).toStrictEqual({
    fragment: new Map(),
    host: 'www.reddit.com',
    path: 'r/linux',
    query: new Map(),
    scheme: 'https',
  });
});

test('multiple same keys in query parameters', () => {
  const test: string = 'https://www.reddit.com/r/dev?verbose=v&verbose=vv&a=true';

  const results: IUri = parse(test);

  console.log(results);

  expect(results).toStrictEqual({
    fragment: new Map(),
    host: 'www.reddit.com',
    path: 'r/dev',
    query: new Map(),
    scheme: 'https',
  })
});