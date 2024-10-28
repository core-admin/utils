import {
  toCamelCase,
  toPascalCase,
  toKebabCase,
  toSnakeCase,
  toTitleCase,
  toSentenceCase,
  convertCase,
} from '../convert-name';

describe('命名转换函数测试', () => {
  describe('toCamelCase', () => {
    test('应该正确转换为驼峰命名', () => {
      expect(toCamelCase('some_database_field_name')).toBe('someDatabaseFieldName');
      expect(toCamelCase('Some label that needs to be camelized')).toBe(
        'someLabelThatNeedsToBeCamelized',
      );
      expect(toCamelCase('some-javascript-property')).toBe('someJavascriptProperty');
      expect(toCamelCase('some-mixed_string with spaces_underscores-and-hyphens')).toBe(
        'someMixedStringWithSpacesUnderscoresAndHyphens',
      );
    });
  });

  describe('toPascalCase', () => {
    test('应该正确转换为帕斯卡命名', () => {
      expect(toPascalCase('some_database_field_name')).toBe('SomeDatabaseFieldName');
      expect(toPascalCase('Some label that needs to be pascalized')).toBe(
        'SomeLabelThatNeedsToBePascalized',
      );
      expect(toPascalCase('some-javascript-property')).toBe('SomeJavascriptProperty');
      expect(toPascalCase('some-mixed_string with spaces_underscores-and-hyphens')).toBe(
        'SomeMixedStringWithSpacesUnderscoresAndHyphens',
      );
    });
  });

  describe('toKebabCase', () => {
    test('应该正确转换为短横线命名', () => {
      expect(toKebabCase('camelCase')).toBe('camel-case');
      expect(toKebabCase('some text')).toBe('some-text');
      expect(toKebabCase('some-mixed_string With spaces_underscores-and-hyphens')).toBe(
        'some-mixed-string-with-spaces-underscores-and-hyphens',
      );
      expect(toKebabCase('AllThe-small Things')).toBe('all-the-small-things');
      expect(toKebabCase('IAmEditingSomeXMLAndHTML')).toBe('i-am-editing-some-xml-and-html');
    });
  });

  describe('toSnakeCase', () => {
    test('应该正确转换为下划线命名', () => {
      expect(toSnakeCase('camelCase')).toBe('camel_case');
      expect(toSnakeCase('some text')).toBe('some_text');
      expect(toSnakeCase('some-mixed_string With spaces_underscores-and-hyphens')).toBe(
        'some_mixed_string_with_spaces_underscores_and_hyphens',
      );
      expect(toSnakeCase('AllThe-small Things')).toBe('all_the_small_things');
      expect(toSnakeCase('IAmEditingSomeXMLAndHTML')).toBe('i_am_editing_some_xml_and_html');
    });
  });

  describe('toTitleCase', () => {
    test('应该正确转换为标题命名', () => {
      expect(toTitleCase('some_database_field_name')).toBe('Some Database Field Name');
      expect(toTitleCase('Some label that needs to be title-cased')).toBe(
        'Some Label That Needs To Be Title Cased',
      );
      expect(toTitleCase('some-package-name')).toBe('Some Package Name');
      expect(toTitleCase('some-mixed_string with spaces_underscores-and-hyphens')).toBe(
        'Some Mixed String With Spaces Underscores And Hyphens',
      );
    });
  });

  describe('toSentenceCase', () => {
    test('应该正确转换为句子命名', () => {
      expect(toSentenceCase('some_database_field_name')).toBe('Some database field name');
      expect(toSentenceCase('Some label that needs to be title-cased')).toBe(
        'Some label that needs to be title cased',
      );
      expect(toSentenceCase('some-package-name')).toBe('Some package name');
      expect(toSentenceCase('some-mixed_string with spaces_underscores-and-hyphens')).toBe(
        'Some mixed string with spaces underscores and hyphens',
      );
    });
  });

  describe('convertCase', () => {
    const testString = 'mixed_string with spaces_underscores-and-hyphens';

    test('应该根据指定类型正确转换命名', () => {
      expect(convertCase(testString, 'camel')).toBe('mixedStringWithSpacesUnderscoresAndHyphens');
      expect(convertCase(testString, 'pascal')).toBe('MixedStringWithSpacesUnderscoresAndHyphens');
      expect(convertCase(testString, 'kebab')).toBe(
        'mixed-string-with-spaces-underscores-and-hyphens',
      );
      expect(convertCase(testString, 'snake')).toBe(
        'mixed_string_with_spaces_underscores_and_hyphens',
      );
      expect(convertCase(testString, 'title')).toBe(
        'Mixed String With Spaces Underscores And Hyphens',
      );
      expect(convertCase(testString, 'sentence')).toBe(
        'Mixed string with spaces underscores and hyphens',
      );
    });

    test('默认应该转换为驼峰命名', () => {
      expect(convertCase(testString)).toBe('mixedStringWithSpacesUnderscoresAndHyphens');
    });
  });
});
