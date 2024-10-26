const reg = /[A-Z]{2,}(?=[A-Z][a-z]+\d*|\b)|[A-Z]?[a-z]+\d*|[A-Z]|\d+/g;

/**
 * 将任意大小写转换为驼峰命名（小驼峰）
 * @example
 * toCamelCase('some_database_field_name'); // 'someDatabaseFieldName'
 * toCamelCase('Some label that needs to be camelized'); // 'someLabelThatNeedsToBeCamelized'
 * toCamelCase('some-javascript-property'); // 'someJavascriptProperty'
 * toCamelCase('some-mixed_string with spaces_underscores-and-hyphens'); // 'someMixedStringWithSpacesUnderscoresAndHyphens'
 */
export function toCamelCase(name: string) {
  const matchRes = name.match(reg);
  if (!matchRes) {
    return name;
  }
  const res = matchRes.map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase()).join('');
  return res.slice(0, 1).toLowerCase() + res.slice(1);
}

/**
 * 将任意大小写转换为帕斯卡命名（大驼峰命名）
 * @example
 * toPascalCase('some_database_field_name'); // 'SomeDatabaseFieldName'
 * toPascalCase('Some label that needs to be pascalized'); // 'SomeLabelThatNeedsToBePascalized'
 * toPascalCase('some-javascript-property'); // 'SomeJavascriptProperty'
 * toPascalCase('some-mixed_string with spaces_underscores-and-hyphens'); // 'SomeMixedStringWithSpacesUnderscoresAndHyphens'
 */
export function toPascalCase(name: string) {
  const matchRes = name.match(reg);
  if (!matchRes) {
    return name;
  }
  return matchRes.map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase()).join('');
}

/**
 * 将任意大小写转换为短横线命名（kebab case）。
 * 短横线大小写最常用于 URL slug 中。Kebab 大小写字符串全部小写，单词之间用连字符分隔。
 * @example
 * toKebabCase('camelCase'); // 'camel-case'
 * toKebabCase('some text'); // 'some-text'
 * toKebabCase('some-mixed_string With spaces_underscores-and-hyphens'); // 'some-mixed-string-with-spaces-underscores-and-hyphens'
 * toKebabCase('AllThe-small Things'); // 'all-the-small-things'
 * toKebabCase('IAmEditingSomeXMLAndHTML'); 'i-am-editing-some-xml-and-html'
 */
export function toKebabCase(name: string) {
  const matchRes = name.match(reg);
  if (!matchRes) {
    return name;
  }
  return matchRes.map(x => x.toLowerCase()).join('-');
}

/**
 * 将任意大小写转换为下划线命名（snake case 蛇形命名）。
 * 蛇形命名法最常用于 Python 或 Ruby 等语言。蛇形字符串全部小写，单词之间用下划线分隔。例如some_name是蛇的情况，但some_Name不是。
 * @example
 * toSnakeCase('camelCase'); // 'camel_case'
 * toSnakeCase('some text'); // 'some_text'
 * toSnakeCase('some-mixed_string With spaces_underscores-and-hyphens'); // 'some_mixed_string_with_spaces_underscores_and_hyphens'
 * toSnakeCase('AllThe-small Things'); // 'all_the_small_things'
 * toSnakeCase('IAmEditingSomeXMLAndHTML'); // 'i_am_editing_some_xml_and_html'
 */
export function toSnakeCase(name: string) {
  const matchRes = name.match(reg);
  if (!matchRes) {
    return name;
  }
  return matchRes.map(x => x.toLowerCase()).join('_');
}

/**
 * 将任意大小写转换为标题命名（title case）。
 * 标题大小写最常用于标题或标题中。标题大小写字符串的每个单词的第一个字母大写，单词之间用空格分隔。例如Some Name是标题大小写，但Some name不是。
 * @example
 * toTitleCase('some_database_field_name'); // 'Some Database Field Name'
 * toTitleCase('Some label that needs to be title-cased'); // 'Some Label That Needs To Be Title Cased'
 * toTitleCase('some-package-name'); // 'Some Package Name'
 * toTitleCase('some-mixed_string with spaces_underscores-and-hyphens'); // 'Some Mixed String With Spaces Underscores And Hyphens'
 */
export function toTitleCase(name: string) {
  const matchRes = name.match(reg);
  if (!matchRes) {
    return name;
  }
  return matchRes.map(x => x.slice(0, 1).toUpperCase() + x.slice(1)).join(' ');
}

/**
 * 将任意大小写转换为句子大小写（sentence case）。
 * 句子中最常使用句子大小写。句子大小写字符串的第一个字母大写，单词之间用空格分隔。例如Some name是句子大小写，但some Name不是。
 * @example
 * toSentenceCase('some_database_field_name'); // 'Some database field name'
 * toSentenceCase('Some label that needs to be title-cased'); // 'Some label that needs to be title cased'
 * toSentenceCase('some-package-name'); // 'Some package name'
 * toSentenceCase('some-mixed_string with spaces_underscores-and-hyphens'); // 'Some mixed string with spaces underscores and hyphens'
 */
export function toSentenceCase(name: string) {
  const matchRes = name.match(reg);
  if (!matchRes) {
    return name;
  }
  const res = matchRes.join(' ');
  return res.slice(0, 1).toUpperCase() + res.slice(1);
}

/**
 * 根据类型转换命名
 * @example
 * convertCase('mixed_string with spaces_underscores-and-hyphens', 'camel'); // 'mixedStringWithSpacesUnderscoresAndHyphens'
 * convertCase('mixed_string with spaces_underscores-and-hyphens', 'pascal'); // 'MixedStringWithSpacesUnderscoresAndHyphens'
 * convertCase('mixed_string with spaces_underscores-and-hyphens', 'kebab'); // 'mixed-string-with-spaces-underscores-and-hyphens'
 * convertCase('mixed_string with spaces_underscores-and-hyphens', 'snake'); // 'mixed_string_with_spaces_underscores_and_hyphens'
 * convertCase('mixed_string with spaces_underscores-and-hyphens', 'title'); // 'Mixed String With Spaces Underscores And Hyphens'
 * convertCase('mixed_string with spaces_underscores-and-hyphens', 'sentence'); // 'Mixed string with spaces underscores and hyphens'
 */
export function convertCase(
  name: string,
  toCase: 'camel' | 'pascal' | 'kebab' | 'snake' | 'title' | 'sentence' = 'camel',
) {
  const delimiter =
    toCase === 'snake'
      ? '_'
      : toCase === 'kebab'
        ? '-'
        : ['title', 'sentence'].includes(toCase)
          ? ' '
          : '';

  const transform = ['camel', 'pascal'].includes(toCase)
    ? (x: string) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase()
    : ['snake', 'kebab'].includes(toCase)
      ? (x: string) => x.toLowerCase()
      : toCase === 'title'
        ? (x: string) => x.slice(0, 1).toUpperCase() + x.slice(1)
        : (x: string) => x;

  const finalTransform =
    toCase === 'camel'
      ? (x: string) => x.slice(0, 1).toLowerCase() + x.slice(1)
      : toCase === 'sentence'
        ? (x: string) => x.slice(0, 1).toUpperCase() + x.slice(1)
        : (x: string) => x;

  const words = name.match(reg);
  if (!words) {
    return name;
  }

  return finalTransform(words.map(transform).join(delimiter));
}
