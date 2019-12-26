import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {containsCaseInsensitive} from './string.tools';


const COUNTRIES_DATA_PATH = 'countries';

export const COUNTRIES = [{
  'name': 'Afghanistan',
  'latlng': [33, 65],
  'flag': 'https://restcountries.eu/data/afg.svg',
  'iso': 'af'
}, {
  'name': 'Åland Islands',
  'latlng': [60.116667, 19.9],
  'flag': 'https://restcountries.eu/data/ala.svg',
  'iso': 'ax'
}, {
  'name': 'Albania',
  'latlng': [41, 20],
  'flag': 'https://restcountries.eu/data/alb.svg',
  'iso': 'al'
}, {
  'name': 'Algeria',
  'latlng': [28, 3],
  'flag': 'https://restcountries.eu/data/dza.svg',
  'iso': 'dz'
}, {
  'name': 'American Samoa',
  'latlng': [-14.33333333, -170],
  'flag': 'https://restcountries.eu/data/asm.svg',
  'iso': 'as'
}, {
  'name': 'Andorra',
  'latlng': [42.5, 1.5],
  'flag': 'https://restcountries.eu/data/and.svg',
  'iso': 'ad'
}, {
  'name': 'Angola',
  'latlng': [-12.5, 18.5],
  'flag': 'https://restcountries.eu/data/ago.svg',
  'iso': 'ao'
}, {
  'name': 'Anguilla',
  'latlng': [18.25, -63.16666666],
  'flag': 'https://restcountries.eu/data/aia.svg',
  'iso': 'ai'
}, {
  'name': 'Antarctica',
  'latlng': [-74.65, 4.48],
  'flag': 'https://restcountries.eu/data/ata.svg',
  'iso': 'aq'
}, {
  'name': 'Antigua and Barbuda',
  'latlng': [17.05, -61.8],
  'flag': 'https://restcountries.eu/data/atg.svg',
  'iso': 'ag'
}, {
  'name': 'Argentina',
  'latlng': [-34, -64],
  'flag': 'https://restcountries.eu/data/arg.svg',
  'iso': 'ar'
}, {
  'name': 'Armenia',
  'latlng': [40, 45],
  'flag': 'https://restcountries.eu/data/arm.svg',
  'iso': 'am'
}, {
  'name': 'Aruba',
  'latlng': [12.5, -69.96666666],
  'flag': 'https://restcountries.eu/data/abw.svg',
  'iso': 'aw'
}, {
  'name': 'Australia',
  'latlng': [-27, 133],
  'flag': 'https://restcountries.eu/data/aus.svg',
  'iso': 'au'
}, {
  'name': 'Austria',
  'latlng': [47.33333333, 13.33333333],
  'flag': 'https://restcountries.eu/data/aut.svg',
  'iso': 'at'
}, {
  'name': 'Azerbaijan',
  'latlng': [40.5, 47.5],
  'flag': 'https://restcountries.eu/data/aze.svg',
  'iso': 'az'
}, {
  'name': 'Bahamas',
  'latlng': [24.25, -76],
  'flag': 'https://restcountries.eu/data/bhs.svg',
  'iso': 'bs'
}, {
  'name': 'Bahrain',
  'latlng': [26, 50.55],
  'flag': 'https://restcountries.eu/data/bhr.svg',
  'iso': 'bh'
}, {
  'name': 'Bangladesh',
  'latlng': [24, 90],
  'flag': 'https://restcountries.eu/data/bgd.svg',
  'iso': 'bd'
}, {
  'name': 'Barbados',
  'latlng': [13.16666666, -59.53333333],
  'flag': 'https://restcountries.eu/data/brb.svg',
  'iso': 'bb'
}, {
  'name': 'Belarus',
  'latlng': [53, 28],
  'flag': 'https://restcountries.eu/data/blr.svg',
  'iso': 'by'
}, {
  'name': 'Belgium',
  'latlng': [50.83333333, 4],
  'flag': 'https://restcountries.eu/data/bel.svg',
  'iso': 'be'
}, {
  'name': 'Belize',
  'latlng': [17.25, -88.75],
  'flag': 'https://restcountries.eu/data/blz.svg',
  'iso': 'bz'
}, {
  'name': 'Benin',
  'latlng': [9.5, 2.25],
  'flag': 'https://restcountries.eu/data/ben.svg',
  'iso': 'bj'
}, {
  'name': 'Bermuda',
  'latlng': [32.33333333, -64.75],
  'flag': 'https://restcountries.eu/data/bmu.svg',
  'iso': 'bm'
}, {
  'name': 'Bhutan',
  'latlng': [27.5, 90.5],
  'flag': 'https://restcountries.eu/data/btn.svg',
  'iso': 'bt'
}, {
  'name': 'Bolivia (Plurinational State of)',
  'latlng': [-17, -65],
  'flag': 'https://restcountries.eu/data/bol.svg',
  'iso': 'bo'
}, {
  'name': 'Bonaire, Sint Eustatius and Saba',
  'latlng': [12.15, -68.266667],
  'flag': 'https://restcountries.eu/data/bes.svg',
  'iso': 'bq'
}, {
  'name': 'Bosnia and Herzegovina',
  'latlng': [44, 18],
  'flag': 'https://restcountries.eu/data/bih.svg',
  'iso': 'ba'
}, {
  'name': 'Botswana',
  'latlng': [-22, 24],
  'flag': 'https://restcountries.eu/data/bwa.svg',
  'iso': 'bw'
}, {
  'name': 'Bouvet Island',
  'latlng': [-54.43333333, 3.4],
  'flag': 'https://restcountries.eu/data/bvt.svg',
  'iso': 'bv'
}, {
  'name': 'Brazil',
  'latlng': [-10, -55],
  'flag': 'https://restcountries.eu/data/bra.svg',
  'iso': 'br'
}, {
  'name': 'British Indian Ocean Territory',
  'latlng': [-6, 71.5],
  'flag': 'https://restcountries.eu/data/iot.svg',
  'iso': 'io'
}, {
  'name': 'United States Minor Outlying Islands',
  'latlng': [],
  'flag': 'https://restcountries.eu/data/umi.svg',
  'iso': 'um'
}, {
  'name': 'Virgin Islands (British)',
  'latlng': [18.431383, -64.62305],
  'flag': 'https://restcountries.eu/data/vgb.svg',
  'iso': 'vg'
}, {
  'name': 'Virgin Islands (U.S.)',
  'latlng': [18.34, -64.93],
  'flag': 'https://restcountries.eu/data/vir.svg',
  'iso': 'vi'
}, {
  'name': 'Brunei Darussalam',
  'latlng': [4.5, 114.66666666],
  'flag': 'https://restcountries.eu/data/brn.svg',
  'iso': 'bn'
}, {
  'name': 'Bulgaria',
  'latlng': [43, 25],
  'flag': 'https://restcountries.eu/data/bgr.svg',
  'iso': 'bg'
}, {
  'name': 'Burkina Faso',
  'latlng': [13, -2],
  'flag': 'https://restcountries.eu/data/bfa.svg',
  'iso': 'bf'
}, {
  'name': 'Burundi',
  'latlng': [-3.5, 30],
  'flag': 'https://restcountries.eu/data/bdi.svg',
  'iso': 'bi'
}, {
  'name': 'Cambodia',
  'latlng': [13, 105],
  'flag': 'https://restcountries.eu/data/khm.svg',
  'iso': 'kh'
}, {
  'name': 'Cameroon',
  'latlng': [6, 12],
  'flag': 'https://restcountries.eu/data/cmr.svg',
  'iso': 'cm'
}, {
  'name': 'Canada',
  'latlng': [60, -95],
  'flag': 'https://restcountries.eu/data/can.svg',
  'iso': 'ca'
}, {
  'name': 'Cabo Verde',
  'latlng': [16, -24],
  'flag': 'https://restcountries.eu/data/cpv.svg',
  'iso': 'cv'
}, {
  'name': 'Cayman Islands',
  'latlng': [19.5, -80.5],
  'flag': 'https://restcountries.eu/data/cym.svg',
  'iso': 'ky'
}, {
  'name': 'Central African Republic',
  'latlng': [7, 21],
  'flag': 'https://restcountries.eu/data/caf.svg',
  'iso': 'cf'
}, {'name': 'Chad', 'latlng': [15, 19], 'flag': 'https://restcountries.eu/data/tcd.svg', 'iso': 'td'}, {
  'name': 'Chile',
  'latlng': [-30, -71],
  'flag': 'https://restcountries.eu/data/chl.svg',
  'iso': 'cl'
}, {
  'name': 'China',
  'latlng': [35, 105],
  'flag': 'https://restcountries.eu/data/chn.svg',
  'iso': 'cn'
}, {
  'name': 'Christmas Island',
  'latlng': [-10.5, 105.66666666],
  'flag': 'https://restcountries.eu/data/cxr.svg',
  'iso': 'cx'
}, {
  'name': 'Cocos (Keeling) Islands',
  'latlng': [-12.5, 96.83333333],
  'flag': 'https://restcountries.eu/data/cck.svg',
  'iso': 'cc'
}, {
  'name': 'Colombia',
  'latlng': [4, -72],
  'flag': 'https://restcountries.eu/data/col.svg',
  'iso': 'co'
}, {
  'name': 'Comoros',
  'latlng': [-12.16666666, 44.25],
  'flag': 'https://restcountries.eu/data/com.svg',
  'iso': 'km'
}, {
  'name': 'Congo',
  'latlng': [-1, 15],
  'flag': 'https://restcountries.eu/data/cog.svg',
  'iso': 'cg'
}, {
  'name': 'Congo (Democratic Republic of the)',
  'latlng': [0, 25],
  'flag': 'https://restcountries.eu/data/cod.svg',
  'iso': 'cd'
}, {
  'name': 'Cook Islands',
  'latlng': [-21.23333333, -159.76666666],
  'flag': 'https://restcountries.eu/data/cok.svg',
  'iso': 'ck'
}, {
  'name': 'Costa Rica',
  'latlng': [10, -84],
  'flag': 'https://restcountries.eu/data/cri.svg',
  'iso': 'cr'
}, {
  'name': 'Croatia',
  'latlng': [45.16666666, 15.5],
  'flag': 'https://restcountries.eu/data/hrv.svg',
  'iso': 'hr'
}, {
  'name': 'Cuba',
  'latlng': [21.5, -80],
  'flag': 'https://restcountries.eu/data/cub.svg',
  'iso': 'cu'
}, {
  'name': 'Curaçao',
  'latlng': [12.116667, -68.933333],
  'flag': 'https://restcountries.eu/data/cuw.svg',
  'iso': 'cw'
}, {
  'name': 'Cyprus',
  'latlng': [35, 33],
  'flag': 'https://restcountries.eu/data/cyp.svg',
  'iso': 'cy'
}, {
  'name': 'Czech Republic',
  'latlng': [49.75, 15.5],
  'flag': 'https://restcountries.eu/data/cze.svg',
  'iso': 'cz'
}, {
  'name': 'Denmark',
  'latlng': [56, 10],
  'flag': 'https://restcountries.eu/data/dnk.svg',
  'iso': 'dk'
}, {
  'name': 'Djibouti',
  'latlng': [11.5, 43],
  'flag': 'https://restcountries.eu/data/dji.svg',
  'iso': 'dj'
}, {
  'name': 'Dominica',
  'latlng': [15.41666666, -61.33333333],
  'flag': 'https://restcountries.eu/data/dma.svg',
  'iso': 'dm'
}, {
  'name': 'Dominican Republic',
  'latlng': [19, -70.66666666],
  'flag': 'https://restcountries.eu/data/dom.svg',
  'iso': 'do'
}, {
  'name': 'Ecuador',
  'latlng': [-2, -77.5],
  'flag': 'https://restcountries.eu/data/ecu.svg',
  'iso': 'ec'
}, {
  'name': 'Egypt',
  'latlng': [27, 30],
  'flag': 'https://restcountries.eu/data/egy.svg',
  'iso': 'eg'
}, {
  'name': 'El Salvador',
  'latlng': [13.83333333, -88.91666666],
  'flag': 'https://restcountries.eu/data/slv.svg',
  'iso': 'sv'
}, {
  'name': 'Equatorial Guinea',
  'latlng': [2, 10],
  'flag': 'https://restcountries.eu/data/gnq.svg',
  'iso': 'gq'
}, {
  'name': 'Eritrea',
  'latlng': [15, 39],
  'flag': 'https://restcountries.eu/data/eri.svg',
  'iso': 'er'
}, {
  'name': 'Estonia',
  'latlng': [59, 26],
  'flag': 'https://restcountries.eu/data/est.svg',
  'iso': 'ee'
}, {
  'name': 'Ethiopia',
  'latlng': [8, 38],
  'flag': 'https://restcountries.eu/data/eth.svg',
  'iso': 'et'
}, {
  'name': 'Falkland Islands (Malvinas)',
  'latlng': [-51.75, -59],
  'flag': 'https://restcountries.eu/data/flk.svg',
  'iso': 'fk'
}, {
  'name': 'Faroe Islands',
  'latlng': [62, -7],
  'flag': 'https://restcountries.eu/data/fro.svg',
  'iso': 'fo'
}, {
  'name': 'Fiji',
  'latlng': [-18, 175],
  'flag': 'https://restcountries.eu/data/fji.svg',
  'iso': 'fj'
}, {
  'name': 'Finland',
  'latlng': [64, 26],
  'flag': 'https://restcountries.eu/data/fin.svg',
  'iso': 'fi'
}, {
  'name': 'France',
  'latlng': [46, 2],
  'flag': 'https://restcountries.eu/data/fra.svg',
  'iso': 'fr'
}, {
  'name': 'French Guiana',
  'latlng': [4, -53],
  'flag': 'https://restcountries.eu/data/guf.svg',
  'iso': 'gf'
}, {
  'name': 'French Polynesia',
  'latlng': [-15, -140],
  'flag': 'https://restcountries.eu/data/pyf.svg',
  'iso': 'pf'
}, {
  'name': 'French Southern Territories',
  'latlng': [-49.25, 69.167],
  'flag': 'https://restcountries.eu/data/atf.svg',
  'iso': 'tf'
}, {
  'name': 'Gabon',
  'latlng': [-1, 11.75],
  'flag': 'https://restcountries.eu/data/gab.svg',
  'iso': 'ga'
}, {
  'name': 'Gambia',
  'latlng': [13.46666666, -16.56666666],
  'flag': 'https://restcountries.eu/data/gmb.svg',
  'iso': 'gm'
}, {
  'name': 'Georgia',
  'latlng': [42, 43.5],
  'flag': 'https://restcountries.eu/data/geo.svg',
  'iso': 'ge'
}, {
  'name': 'Germany',
  'latlng': [51, 9],
  'flag': 'https://restcountries.eu/data/deu.svg',
  'iso': 'de'
}, {
  'name': 'Ghana',
  'latlng': [8, -2],
  'flag': 'https://restcountries.eu/data/gha.svg',
  'iso': 'gh'
}, {
  'name': 'Gibraltar',
  'latlng': [36.13333333, -5.35],
  'flag': 'https://restcountries.eu/data/gib.svg',
  'iso': 'gi'
}, {
  'name': 'Greece',
  'latlng': [39, 22],
  'flag': 'https://restcountries.eu/data/grc.svg',
  'iso': 'gr'
}, {
  'name': 'Greenland',
  'latlng': [72, -40],
  'flag': 'https://restcountries.eu/data/grl.svg',
  'iso': 'gl'
}, {
  'name': 'Grenada',
  'latlng': [12.11666666, -61.66666666],
  'flag': 'https://restcountries.eu/data/grd.svg',
  'iso': 'gd'
}, {
  'name': 'Guadeloupe',
  'latlng': [16.25, -61.583333],
  'flag': 'https://restcountries.eu/data/glp.svg',
  'iso': 'gp'
}, {
  'name': 'Guam',
  'latlng': [13.46666666, 144.78333333],
  'flag': 'https://restcountries.eu/data/gum.svg',
  'iso': 'gu'
}, {
  'name': 'Guatemala',
  'latlng': [15.5, -90.25],
  'flag': 'https://restcountries.eu/data/gtm.svg',
  'iso': 'gt'
}, {
  'name': 'Guernsey',
  'latlng': [49.46666666, -2.58333333],
  'flag': 'https://restcountries.eu/data/ggy.svg',
  'iso': 'gg'
}, {
  'name': 'Guinea',
  'latlng': [11, -10],
  'flag': 'https://restcountries.eu/data/gin.svg',
  'iso': 'gn'
}, {
  'name': 'Guinea-Bissau',
  'latlng': [12, -15],
  'flag': 'https://restcountries.eu/data/gnb.svg',
  'iso': 'gw'
}, {
  'name': 'Guyana',
  'latlng': [5, -59],
  'flag': 'https://restcountries.eu/data/guy.svg',
  'iso': 'gy'
}, {
  'name': 'Haiti',
  'latlng': [19, -72.41666666],
  'flag': 'https://restcountries.eu/data/hti.svg',
  'iso': 'ht'
}, {
  'name': 'Heard Island and McDonald Islands',
  'latlng': [-53.1, 72.51666666],
  'flag': 'https://restcountries.eu/data/hmd.svg',
  'iso': 'hm'
}, {
  'name': 'Holy See',
  'latlng': [41.9, 12.45],
  'flag': 'https://restcountries.eu/data/vat.svg',
  'iso': 'va'
}, {
  'name': 'Honduras',
  'latlng': [15, -86.5],
  'flag': 'https://restcountries.eu/data/hnd.svg',
  'iso': 'hn'
}, {
  'name': 'Hong Kong',
  'latlng': [22.25, 114.16666666],
  'flag': 'https://restcountries.eu/data/hkg.svg',
  'iso': 'hk'
}, {
  'name': 'Hungary',
  'latlng': [47, 20],
  'flag': 'https://restcountries.eu/data/hun.svg',
  'iso': 'hu'
}, {
  'name': 'Iceland',
  'latlng': [65, -18],
  'flag': 'https://restcountries.eu/data/isl.svg',
  'iso': 'is'
}, {
  'name': 'India',
  'latlng': [20, 77],
  'flag': 'https://restcountries.eu/data/ind.svg',
  'iso': 'in'
}, {
  'name': 'Indonesia',
  'latlng': [-5, 120],
  'flag': 'https://restcountries.eu/data/idn.svg',
  'iso': 'id'
}, {
  'name': 'Côte d\'Ivoire',
  'latlng': [8, -5],
  'flag': 'https://restcountries.eu/data/civ.svg',
  'iso': 'ci'
}, {
  'name': 'Iran (Islamic Republic of)',
  'latlng': [32, 53],
  'flag': 'https://restcountries.eu/data/irn.svg',
  'iso': 'ir'
}, {
  'name': 'Iraq',
  'latlng': [33, 44],
  'flag': 'https://restcountries.eu/data/irq.svg',
  'iso': 'iq'
}, {
  'name': 'Ireland',
  'latlng': [53, -8],
  'flag': 'https://restcountries.eu/data/irl.svg',
  'iso': 'ie'
}, {
  'name': 'Isle of Man',
  'latlng': [54.25, -4.5],
  'flag': 'https://restcountries.eu/data/imn.svg',
  'iso': 'im'
}, {
  'name': 'Israel',
  'latlng': [31.5, 34.75],
  'flag': 'https://restcountries.eu/data/isr.svg',
  'iso': 'il'
}, {
  'name': 'Italy',
  'latlng': [42.83333333, 12.83333333],
  'flag': 'https://restcountries.eu/data/ita.svg',
  'iso': 'it'
}, {
  'name': 'Jamaica',
  'latlng': [18.25, -77.5],
  'flag': 'https://restcountries.eu/data/jam.svg',
  'iso': 'jm'
}, {
  'name': 'Japan',
  'latlng': [36, 138],
  'flag': 'https://restcountries.eu/data/jpn.svg',
  'iso': 'jp'
}, {
  'name': 'Jersey',
  'latlng': [49.25, -2.16666666],
  'flag': 'https://restcountries.eu/data/jey.svg',
  'iso': 'je'
}, {
  'name': 'Jordan',
  'latlng': [31, 36],
  'flag': 'https://restcountries.eu/data/jor.svg',
  'iso': 'jo'
}, {
  'name': 'Kazakhstan',
  'latlng': [48, 68],
  'flag': 'https://restcountries.eu/data/kaz.svg',
  'iso': 'kz'
}, {
  'name': 'Kenya',
  'latlng': [1, 38],
  'flag': 'https://restcountries.eu/data/ken.svg',
  'iso': 'ke'
}, {
  'name': 'Kiribati',
  'latlng': [1.41666666, 173],
  'flag': 'https://restcountries.eu/data/kir.svg',
  'iso': 'ki'
}, {
  'name': 'Kuwait',
  'latlng': [29.5, 45.75],
  'flag': 'https://restcountries.eu/data/kwt.svg',
  'iso': 'kw'
}, {
  'name': 'Kyrgyzstan',
  'latlng': [41, 75],
  'flag': 'https://restcountries.eu/data/kgz.svg',
  'iso': 'kg'
}, {
  'name': 'Lao People\'s Democratic Republic',
  'latlng': [18, 105],
  'flag': 'https://restcountries.eu/data/lao.svg',
  'iso': 'la'
}, {
  'name': 'Latvia',
  'latlng': [57, 25],
  'flag': 'https://restcountries.eu/data/lva.svg',
  'iso': 'lv'
}, {
  'name': 'Lebanon',
  'latlng': [33.83333333, 35.83333333],
  'flag': 'https://restcountries.eu/data/lbn.svg',
  'iso': 'lb'
}, {
  'name': 'Lesotho',
  'latlng': [-29.5, 28.5],
  'flag': 'https://restcountries.eu/data/lso.svg',
  'iso': 'ls'
}, {
  'name': 'Liberia',
  'latlng': [6.5, -9.5],
  'flag': 'https://restcountries.eu/data/lbr.svg',
  'iso': 'lr'
}, {
  'name': 'Libya',
  'latlng': [25, 17],
  'flag': 'https://restcountries.eu/data/lby.svg',
  'iso': 'ly'
}, {
  'name': 'Liechtenstein',
  'latlng': [47.26666666, 9.53333333],
  'flag': 'https://restcountries.eu/data/lie.svg',
  'iso': 'li'
}, {
  'name': 'Lithuania',
  'latlng': [56, 24],
  'flag': 'https://restcountries.eu/data/ltu.svg',
  'iso': 'lt'
}, {
  'name': 'Luxembourg',
  'latlng': [49.75, 6.16666666],
  'flag': 'https://restcountries.eu/data/lux.svg',
  'iso': 'lu'
}, {
  'name': 'Macao',
  'latlng': [22.16666666, 113.55],
  'flag': 'https://restcountries.eu/data/mac.svg',
  'iso': 'mo'
}, {
  'name': 'Macedonia (the former Yugoslav Republic of)',
  'latlng': [41.83333333, 22],
  'flag': 'https://restcountries.eu/data/mkd.svg',
  'iso': 'mk'
}, {
  'name': 'Madagascar',
  'latlng': [-20, 47],
  'flag': 'https://restcountries.eu/data/mdg.svg',
  'iso': 'mg'
}, {
  'name': 'Malawi',
  'latlng': [-13.5, 34],
  'flag': 'https://restcountries.eu/data/mwi.svg',
  'iso': 'mw'
}, {
  'name': 'Malaysia',
  'latlng': [2.5, 112.5],
  'flag': 'https://restcountries.eu/data/mys.svg',
  'iso': 'my'
}, {
  'name': 'Maldives',
  'latlng': [3.25, 73],
  'flag': 'https://restcountries.eu/data/mdv.svg',
  'iso': 'mv'
}, {'name': 'Mali', 'latlng': [17, -4], 'flag': 'https://restcountries.eu/data/mli.svg', 'iso': 'ml'}, {
  'name': 'Malta',
  'latlng': [35.83333333, 14.58333333],
  'flag': 'https://restcountries.eu/data/mlt.svg',
  'iso': 'mt'
}, {
  'name': 'Marshall Islands',
  'latlng': [9, 168],
  'flag': 'https://restcountries.eu/data/mhl.svg',
  'iso': 'mh'
}, {
  'name': 'Martinique',
  'latlng': [14.666667, -61],
  'flag': 'https://restcountries.eu/data/mtq.svg',
  'iso': 'mq'
}, {
  'name': 'Mauritania',
  'latlng': [20, -12],
  'flag': 'https://restcountries.eu/data/mrt.svg',
  'iso': 'mr'
}, {
  'name': 'Mauritius',
  'latlng': [-20.28333333, 57.55],
  'flag': 'https://restcountries.eu/data/mus.svg',
  'iso': 'mu'
}, {
  'name': 'Mayotte',
  'latlng': [-12.83333333, 45.16666666],
  'flag': 'https://restcountries.eu/data/myt.svg',
  'iso': 'yt'
}, {
  'name': 'Mexico',
  'latlng': [23, -102],
  'flag': 'https://restcountries.eu/data/mex.svg',
  'iso': 'mx'
}, {
  'name': 'Micronesia (Federated States of)',
  'latlng': [6.91666666, 158.25],
  'flag': 'https://restcountries.eu/data/fsm.svg',
  'iso': 'fm'
}, {
  'name': 'Moldova (Republic of)',
  'latlng': [47, 29],
  'flag': 'https://restcountries.eu/data/mda.svg',
  'iso': 'md'
}, {
  'name': 'Monaco',
  'latlng': [43.73333333, 7.4],
  'flag': 'https://restcountries.eu/data/mco.svg',
  'iso': 'mc'
}, {
  'name': 'Mongolia',
  'latlng': [46, 105],
  'flag': 'https://restcountries.eu/data/mng.svg',
  'iso': 'mn'
}, {
  'name': 'Montenegro',
  'latlng': [42.5, 19.3],
  'flag': 'https://restcountries.eu/data/mne.svg',
  'iso': 'me'
}, {
  'name': 'Montserrat',
  'latlng': [16.75, -62.2],
  'flag': 'https://restcountries.eu/data/msr.svg',
  'iso': 'ms'
}, {
  'name': 'Morocco',
  'latlng': [32, -5],
  'flag': 'https://restcountries.eu/data/mar.svg',
  'iso': 'ma'
}, {
  'name': 'Mozambique',
  'latlng': [-18.25, 35],
  'flag': 'https://restcountries.eu/data/moz.svg',
  'iso': 'mz'
}, {
  'name': 'Myanmar',
  'latlng': [22, 98],
  'flag': 'https://restcountries.eu/data/mmr.svg',
  'iso': 'mm'
}, {
  'name': 'Namibia',
  'latlng': [-22, 17],
  'flag': 'https://restcountries.eu/data/nam.svg',
  'iso': 'na'
}, {
  'name': 'Nauru',
  'latlng': [-0.53333333, 166.91666666],
  'flag': 'https://restcountries.eu/data/nru.svg',
  'iso': 'nr'
}, {
  'name': 'Nepal',
  'latlng': [28, 84],
  'flag': 'https://restcountries.eu/data/npl.svg',
  'iso': 'np'
}, {
  'name': 'Netherlands',
  'latlng': [52.5, 5.75],
  'flag': 'https://restcountries.eu/data/nld.svg',
  'iso': 'nl'
}, {
  'name': 'New Caledonia',
  'latlng': [-21.5, 165.5],
  'flag': 'https://restcountries.eu/data/ncl.svg',
  'iso': 'nc'
}, {
  'name': 'New Zealand',
  'latlng': [-41, 174],
  'flag': 'https://restcountries.eu/data/nzl.svg',
  'iso': 'nz'
}, {
  'name': 'Nicaragua',
  'latlng': [13, -85],
  'flag': 'https://restcountries.eu/data/nic.svg',
  'iso': 'ni'
}, {
  'name': 'Niger',
  'latlng': [16, 8],
  'flag': 'https://restcountries.eu/data/ner.svg',
  'iso': 'ne'
}, {
  'name': 'Nigeria',
  'latlng': [10, 8],
  'flag': 'https://restcountries.eu/data/nga.svg',
  'iso': 'ng'
}, {
  'name': 'Niue',
  'latlng': [-19.03333333, -169.86666666],
  'flag': 'https://restcountries.eu/data/niu.svg',
  'iso': 'nu'
}, {
  'name': 'Norfolk Island',
  'latlng': [-29.03333333, 167.95],
  'flag': 'https://restcountries.eu/data/nfk.svg',
  'iso': 'nf'
}, {
  'name': 'Korea (Democratic People\'s Republic of)',
  'latlng': [40, 127],
  'flag': 'https://restcountries.eu/data/prk.svg',
  'iso': 'kp'
}, {
  'name': 'Northern Mariana Islands',
  'latlng': [15.2, 145.75],
  'flag': 'https://restcountries.eu/data/mnp.svg',
  'iso': 'mp'
}, {
  'name': 'Norway',
  'latlng': [62, 10],
  'flag': 'https://restcountries.eu/data/nor.svg',
  'iso': 'no'
}, {
  'name': 'Oman',
  'latlng': [21, 57],
  'flag': 'https://restcountries.eu/data/omn.svg',
  'iso': 'om'
}, {
  'name': 'Pakistan',
  'latlng': [30, 70],
  'flag': 'https://restcountries.eu/data/pak.svg',
  'iso': 'pk'
}, {
  'name': 'Palau',
  'latlng': [7.5, 134.5],
  'flag': 'https://restcountries.eu/data/plw.svg',
  'iso': 'pw'
}, {
  'name': 'Palestine, State of',
  'latlng': [31.9, 35.2],
  'flag': 'https://restcountries.eu/data/pse.svg',
  'iso': 'ps'
}, {
  'name': 'Panama',
  'latlng': [9, -80],
  'flag': 'https://restcountries.eu/data/pan.svg',
  'iso': 'pa'
}, {
  'name': 'Papua New Guinea',
  'latlng': [-6, 147],
  'flag': 'https://restcountries.eu/data/png.svg',
  'iso': 'pg'
}, {
  'name': 'Paraguay',
  'latlng': [-23, -58],
  'flag': 'https://restcountries.eu/data/pry.svg',
  'iso': 'py'
}, {
  'name': 'Peru',
  'latlng': [-10, -76],
  'flag': 'https://restcountries.eu/data/per.svg',
  'iso': 'pe'
}, {
  'name': 'Philippines',
  'latlng': [13, 122],
  'flag': 'https://restcountries.eu/data/phl.svg',
  'iso': 'ph'
}, {
  'name': 'Pitcairn',
  'latlng': [-25.06666666, -130.1],
  'flag': 'https://restcountries.eu/data/pcn.svg',
  'iso': 'pn'
}, {
  'name': 'Poland',
  'latlng': [52, 20],
  'flag': 'https://restcountries.eu/data/pol.svg',
  'iso': 'pl'
}, {
  'name': 'Portugal',
  'latlng': [39.5, -8],
  'flag': 'https://restcountries.eu/data/prt.svg',
  'iso': 'pt'
}, {
  'name': 'Puerto Rico',
  'latlng': [18.25, -66.5],
  'flag': 'https://restcountries.eu/data/pri.svg',
  'iso': 'pr'
}, {
  'name': 'Qatar',
  'latlng': [25.5, 51.25],
  'flag': 'https://restcountries.eu/data/qat.svg',
  'iso': 'qa'
}, {
  'name': 'Republic of Kosovo',
  'latlng': [42.666667, 21.166667],
  'flag': 'https://restcountries.eu/data/kos.svg',
  'iso': 'xk'
}, {
  'name': 'Réunion',
  'latlng': [-21.15, 55.5],
  'flag': 'https://restcountries.eu/data/reu.svg',
  'iso': 're'
}, {
  'name': 'Romania',
  'latlng': [46, 25],
  'flag': 'https://restcountries.eu/data/rou.svg',
  'iso': 'ro'
}, {
  'name': 'Russian Federation',
  'latlng': [60, 100],
  'flag': 'https://restcountries.eu/data/rus.svg',
  'iso': 'ru'
}, {
  'name': 'Rwanda',
  'latlng': [-2, 30],
  'flag': 'https://restcountries.eu/data/rwa.svg',
  'iso': 'rw'
}, {
  'name': 'Saint Barthélemy',
  'latlng': [18.5, -63.41666666],
  'flag': 'https://restcountries.eu/data/blm.svg',
  'iso': 'bl'
}, {
  'name': 'Saint Helena, Ascension and Tristan da Cunha',
  'latlng': [-15.95, -5.7],
  'flag': 'https://restcountries.eu/data/shn.svg',
  'iso': 'sh'
}, {
  'name': 'Saint Kitts and Nevis',
  'latlng': [17.33333333, -62.75],
  'flag': 'https://restcountries.eu/data/kna.svg',
  'iso': 'kn'
}, {
  'name': 'Saint Lucia',
  'latlng': [13.88333333, -60.96666666],
  'flag': 'https://restcountries.eu/data/lca.svg',
  'iso': 'lc'
}, {
  'name': 'Saint Martin (French part)',
  'latlng': [18.08333333, -63.95],
  'flag': 'https://restcountries.eu/data/maf.svg',
  'iso': 'mf'
}, {
  'name': 'Saint Pierre and Miquelon',
  'latlng': [46.83333333, -56.33333333],
  'flag': 'https://restcountries.eu/data/spm.svg',
  'iso': 'pm'
}, {
  'name': 'Saint Vincent and the Grenadines',
  'latlng': [13.25, -61.2],
  'flag': 'https://restcountries.eu/data/vct.svg',
  'iso': 'vc'
}, {
  'name': 'Samoa',
  'latlng': [-13.58333333, -172.33333333],
  'flag': 'https://restcountries.eu/data/wsm.svg',
  'iso': 'ws'
}, {
  'name': 'San Marino',
  'latlng': [43.76666666, 12.41666666],
  'flag': 'https://restcountries.eu/data/smr.svg',
  'iso': 'sm'
}, {
  'name': 'Sao Tome and Principe',
  'latlng': [1, 7],
  'flag': 'https://restcountries.eu/data/stp.svg',
  'iso': 'st'
}, {
  'name': 'Saudi Arabia',
  'latlng': [25, 45],
  'flag': 'https://restcountries.eu/data/sau.svg',
  'iso': 'sa'
}, {
  'name': 'Senegal',
  'latlng': [14, -14],
  'flag': 'https://restcountries.eu/data/sen.svg',
  'iso': 'sn'
}, {
  'name': 'Serbia',
  'latlng': [44, 21],
  'flag': 'https://restcountries.eu/data/srb.svg',
  'iso': 'rs'
}, {
  'name': 'Seychelles',
  'latlng': [-4.58333333, 55.66666666],
  'flag': 'https://restcountries.eu/data/syc.svg',
  'iso': 'sc'
}, {
  'name': 'Sierra Leone',
  'latlng': [8.5, -11.5],
  'flag': 'https://restcountries.eu/data/sle.svg',
  'iso': 'sl'
}, {
  'name': 'Singapore',
  'latlng': [1.36666666, 103.8],
  'flag': 'https://restcountries.eu/data/sgp.svg',
  'iso': 'sg'
}, {
  'name': 'Sint Maarten (Dutch part)',
  'latlng': [18.033333, -63.05],
  'flag': 'https://restcountries.eu/data/sxm.svg',
  'iso': 'sx'
}, {
  'name': 'Slovakia',
  'latlng': [48.66666666, 19.5],
  'flag': 'https://restcountries.eu/data/svk.svg',
  'iso': 'sk'
}, {
  'name': 'Slovenia',
  'latlng': [46.11666666, 14.81666666],
  'flag': 'https://restcountries.eu/data/svn.svg',
  'iso': 'si'
}, {
  'name': 'Solomon Islands',
  'latlng': [-8, 159],
  'flag': 'https://restcountries.eu/data/slb.svg',
  'iso': 'sb'
}, {
  'name': 'Somalia',
  'latlng': [10, 49],
  'flag': 'https://restcountries.eu/data/som.svg',
  'iso': 'so'
}, {
  'name': 'South Africa',
  'latlng': [-29, 24],
  'flag': 'https://restcountries.eu/data/zaf.svg',
  'iso': 'za'
}, {
  'name': 'South Georgia and the South Sandwich Islands',
  'latlng': [-54.5, -37],
  'flag': 'https://restcountries.eu/data/sgs.svg',
  'iso': 'gs'
}, {
  'name': 'Korea (Republic of)',
  'latlng': [37, 127.5],
  'flag': 'https://restcountries.eu/data/kor.svg',
  'iso': 'kr'
}, {
  'name': 'South Sudan',
  'latlng': [7, 30],
  'flag': 'https://restcountries.eu/data/ssd.svg',
  'iso': 'ss'
}, {
  'name': 'Spain',
  'latlng': [40, -4],
  'flag': 'https://restcountries.eu/data/esp.svg',
  'iso': 'es'
}, {
  'name': 'Sri Lanka',
  'latlng': [7, 81],
  'flag': 'https://restcountries.eu/data/lka.svg',
  'iso': 'lk'
}, {
  'name': 'Sudan',
  'latlng': [15, 30],
  'flag': 'https://restcountries.eu/data/sdn.svg',
  'iso': 'sd'
}, {
  'name': 'Suriname',
  'latlng': [4, -56],
  'flag': 'https://restcountries.eu/data/sur.svg',
  'iso': 'sr'
}, {
  'name': 'Svalbard and Jan Mayen',
  'latlng': [78, 20],
  'flag': 'https://restcountries.eu/data/sjm.svg',
  'iso': 'sj'
}, {
  'name': 'Swaziland',
  'latlng': [-26.5, 31.5],
  'flag': 'https://restcountries.eu/data/swz.svg',
  'iso': 'sz'
}, {
  'name': 'Sweden',
  'latlng': [62, 15],
  'flag': 'https://restcountries.eu/data/swe.svg',
  'iso': 'se'
}, {
  'name': 'Switzerland',
  'latlng': [47, 8],
  'flag': 'https://restcountries.eu/data/che.svg',
  'iso': 'ch'
}, {
  'name': 'Syrian Arab Republic',
  'latlng': [35, 38],
  'flag': 'https://restcountries.eu/data/syr.svg',
  'iso': 'sy'
}, {
  'name': 'Taiwan',
  'latlng': [23.5, 121],
  'flag': 'https://restcountries.eu/data/twn.svg',
  'iso': 'tw'
}, {
  'name': 'Tajikistan',
  'latlng': [39, 71],
  'flag': 'https://restcountries.eu/data/tjk.svg',
  'iso': 'tj'
}, {
  'name': 'Tanzania, United Republic of',
  'latlng': [-6, 35],
  'flag': 'https://restcountries.eu/data/tza.svg',
  'iso': 'tz'
}, {
  'name': 'Thailand',
  'latlng': [15, 100],
  'flag': 'https://restcountries.eu/data/tha.svg',
  'iso': 'th'
}, {
  'name': 'Timor-Leste',
  'latlng': [-8.83333333, 125.91666666],
  'flag': 'https://restcountries.eu/data/tls.svg',
  'iso': 'tl'
}, {
  'name': 'Togo',
  'latlng': [8, 1.16666666],
  'flag': 'https://restcountries.eu/data/tgo.svg',
  'iso': 'tg'
}, {
  'name': 'Tokelau',
  'latlng': [-9, -172],
  'flag': 'https://restcountries.eu/data/tkl.svg',
  'iso': 'tk'
}, {
  'name': 'Tonga',
  'latlng': [-20, -175],
  'flag': 'https://restcountries.eu/data/ton.svg',
  'iso': 'to'
}, {
  'name': 'Trinidad and Tobago',
  'latlng': [11, -61],
  'flag': 'https://restcountries.eu/data/tto.svg',
  'iso': 'tt'
}, {
  'name': 'Tunisia',
  'latlng': [34, 9],
  'flag': 'https://restcountries.eu/data/tun.svg',
  'iso': 'tn'
}, {
  'name': 'Turkey',
  'latlng': [39, 35],
  'flag': 'https://restcountries.eu/data/tur.svg',
  'iso': 'tr'
}, {
  'name': 'Turkmenistan',
  'latlng': [40, 60],
  'flag': 'https://restcountries.eu/data/tkm.svg',
  'iso': 'tm'
}, {
  'name': 'Turks and Caicos Islands',
  'latlng': [21.75, -71.58333333],
  'flag': 'https://restcountries.eu/data/tca.svg',
  'iso': 'tc'
}, {
  'name': 'Tuvalu',
  'latlng': [-8, 178],
  'flag': 'https://restcountries.eu/data/tuv.svg',
  'iso': 'tv'
}, {
  'name': 'Uganda',
  'latlng': [1, 32],
  'flag': 'https://restcountries.eu/data/uga.svg',
  'iso': 'ug'
}, {
  'name': 'Ukraine',
  'latlng': [49, 32],
  'flag': 'https://restcountries.eu/data/ukr.svg',
  'iso': 'ua'
}, {
  'name': 'United Arab Emirates',
  'latlng': [24, 54],
  'flag': 'https://restcountries.eu/data/are.svg',
  'iso': 'ae'
}, {
  'name': 'United Kingdom of Great Britain and Northern Ireland',
  'latlng': [54, -2],
  'flag': 'https://restcountries.eu/data/gbr.svg',
  'iso': 'gb'
}, {
  'name': 'United States of America',
  'latlng': [38, -97],
  'flag': 'https://restcountries.eu/data/usa.svg',
  'iso': 'us'
}, {
  'name': 'Uruguay',
  'latlng': [-33, -56],
  'flag': 'https://restcountries.eu/data/ury.svg',
  'iso': 'uy'
}, {
  'name': 'Uzbekistan',
  'latlng': [41, 64],
  'flag': 'https://restcountries.eu/data/uzb.svg',
  'iso': 'uz'
}, {
  'name': 'Vanuatu',
  'latlng': [-16, 167],
  'flag': 'https://restcountries.eu/data/vut.svg',
  'iso': 'vu'
}, {
  'name': 'Venezuela (Bolivarian Republic of)',
  'latlng': [8, -66],
  'flag': 'https://restcountries.eu/data/ven.svg',
  'iso': 've'
}, {
  'name': 'Viet Nam',
  'latlng': [16.16666666, 107.83333333],
  'flag': 'https://restcountries.eu/data/vnm.svg',
  'iso': 'vn'
}, {
  'name': 'Wallis and Futuna',
  'latlng': [-13.3, -176.2],
  'flag': 'https://restcountries.eu/data/wlf.svg',
  'iso': 'wf'
}, {
  'name': 'Western Sahara',
  'latlng': [24.5, -13],
  'flag': 'https://restcountries.eu/data/esh.svg',
  'iso': 'eh'
}, {
  'name': 'Yemen',
  'latlng': [15, 48],
  'flag': 'https://restcountries.eu/data/yem.svg',
  'iso': 'ye'
}, {
  'name': 'Zambia',
  'latlng': [-15, 30],
  'flag': 'https://restcountries.eu/data/zmb.svg',
  'iso': 'zm'
}, {
  'name': 'Zimbabwe',
  'latlng': [-20, 30],
  'flag': 'https://restcountries.eu/data/zwe.svg',
  'iso': 'zw'
}];

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(public db: AngularFirestore) {
  }

  public static filterCountries(value: string): string[][] {
    const filterValue = value ? value.toLowerCase() : '';
    const res = COUNTRIES
      .filter(option => containsCaseInsensitive(option.name, filterValue)
        || containsCaseInsensitive(option.iso, filterValue))
      .map(option => [option.name, option.iso])
      .sort((a, b) => b[1].indexOf(value) - a[1].indexOf(value));
    return res;
  }

  get(key) {
    return COUNTRIES.filter(country => country.name === key).map(country => country.latlng);
  }

  update(key, value) {
    return this.db.collection(COUNTRIES_DATA_PATH).doc(key).set(value);
  }

  delete(key) {
    return this.db.collection(COUNTRIES_DATA_PATH).doc(key).delete();
  }

}
