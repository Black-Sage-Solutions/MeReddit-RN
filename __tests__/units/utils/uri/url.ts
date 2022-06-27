import { url } from "@utils/uri/url";

test.each([
  {
    test: {
      host: 'example.com',
      scheme: 'https',
    },
    expected: 'https://example.com',
  },
  {
    test: {
      host: 'reddit.com',
      query: {},
      scheme: 'https',
    },
    expected: 'https://reddit.com'
  },
  {
    test: {
      fragment: new Map<string, string>([['unit', 'test']]),
      host: 'testing',
      path: 'the/url/gen',
      query: {
        by: 'doing'
      },
      scheme: 'mereddit',
    },
    expected: 'mereddit://testing/the/url/gen?by=doing#unit=test'
  }
])(
  'Try making a URL string',
  ({test, expected}) => {
    expect(url(test)).toEqual(expected);
  }
);

