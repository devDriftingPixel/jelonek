/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Navigator from './src/navigation/Navigator';
import {BreadProvider} from 'material-bread';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize'; // Use for caching/memoize for better performance
import {I18nManager} from 'react-native';
import Analytics from 'appcenter-analytics';

export default class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.setI18nConfig(); // set initial config
    Analytics.setEnabled(false);
  }

  public static readonly translate = memoize(
    (key: string, config: any) => i18n.t(key, config),
    (key: string, config: any) => (config ? key + JSON.stringify(config) : key),
  );

  private readonly translationGetters = {
    // lazy requires (metro bundler does not support symlinks)
    pl: () => require('./src/translations/pl.json'),
    // en: () => require('./src/translations/en.json'),
  };

  private setI18nConfig() {
    // fallback if no available language fits
    const fallback = {languageTag: 'pl', isRTL: false};

    const {languageTag, isRTL} =
      RNLocalize.findBestAvailableLanguage(
        Object.keys(this.translationGetters),
      ) || fallback;

    // clear translation cache
    App.translate.cache.clear();
    // update layout direction
    I18nManager.forceRTL(isRTL);
    // set i18n-js config
    i18n.translations = {[languageTag]: this.translationGetters[languageTag]()};
    i18n.locale = languageTag;
  }

  componentDidMount() {
    RNLocalize.addEventListener('change', this.handleLocalizationChange);
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.handleLocalizationChange);
  }

  handleLocalizationChange = () => {
    this.setI18nConfig();
    this.forceUpdate();
  };

  render() {
    return (
      <>
        <SafeAreaProvider>
          <BreadProvider>
            <Navigator />
          </BreadProvider>
        </SafeAreaProvider>
      </>
    );
  }
}
