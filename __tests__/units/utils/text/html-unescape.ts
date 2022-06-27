import { htmlUnescape } from "@app/utils/text";

test.each([
  {
    test: 'hi &lt;there&gt;!',
    expected: 'hi <there>!'
  },
  {
    test: '&lt;img src=&quot;https://i.redd.it/image?test=good&amp;really=good&quot; width=&#39;200&#39; /&gt;',
    expected: '<img src="https://i.redd.it/image?test=good&really=good" width=\'200\' />'
  },
])(
  'Try unescaping html characters',
  ({test, expected}) => {
    expect(htmlUnescape(test)).toEqual(expected)
  }
);
