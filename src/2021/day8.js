
function day8a(input){
    let count = 0;
    input.split('\n').forEach(line => {
        count += line.split(' | ')[1].split(' ').filter(d => d.length == 2 || d.length == 3 || d.length == 4 || d.length == 7).length;
    });

    return count;
}

function day8b(input){
    let sum = 0;
    input.split('\n').forEach(line => {
        let config = Array(7);
        let digits = line.split(' | ')[0].split(' ');

        let cf = digits.filter(d => d.length == 2)[0];
        let acf = digits.filter(d => d.length == 3)[0];
        let bcdf = digits.filter(d => d.length == 4)[0];
       
        if(digits.filter(d => d.includes(cf[0])).length == 9){
            config[2] = cf[1];
            config[5] = cf[0];
        } else {
            config[2] = cf[0];
            config[5] = cf[1];
        }
        config[0] = acf.replace(cf[0], '').replace(cf[1], '');
        let bd = bcdf.replace(cf[0], '').replace(cf[1], '');
        if(digits.filter(d => d.includes(bd[0])).length == 6){
            config[1] = bd[0];
            config[3] = bd[1];
        } else {
            config[1] = bd[1];
            config[3] = bd[0];
        }
        
        let eg = 'abcdefg'.replace(config[0], '').replace(config[1], '').replace(config[2], '').replace(config[3], '').replace(config[5], '');
        if(digits.filter(d => d.includes(eg[0])).length == 4){
            config[4] = eg[0];
            config[6] = eg[1];
        } else {
            config[4] = eg[1];
            config[6] = eg[0];
        }

        let digitStrings = [
            config[0] + config[1] + config[2] + config[4] + config[5] + config[6],
            config[2] + config[5],
            config[0] + config[2] + config[3] + config[4] + config[6],
            config[0] + config[2] + config[3] + config[5] + config[6],
            config[1] + config[2] + config[3] + config[5],
            config[0] + config[1] + config[3] + config[5] + config[6],
            config[0] + config[1] + config[3] + config[4] + config[5] + config[6],
            config[0] + config[2] + config[5],
            config[0] + config[1] + config[2] + config[3] + config[4] + config[5] + config[6],
            config[0] + config[1] + config[2] + config[3] + config[5] + config[6],
        ];
        digitStrings = digitStrings.map(x => [...x].sort().join(''));
        
        let number = 0;
        line.split(' | ')[1].split(' ').reverse().forEach((x, i) => {
            let n = [...x].sort().join('');
            number += 10**i * digitStrings.findIndex(s => s === n);
            //console.log(x, n, number);
        });
        //console.log(config, digitStrings, number);
        sum += number;
    });
    
    return sum;
}

const data2 = `dac abcf ac fdbcga dgcbae gcbfde fgcbd agfed adcgf cdbgfea | cbfa bcafdg cbfa bafcgd`;

const data = `dac abcf ac fdbcga dgcbae gcbfde fgcbd agfed adcgf cdbgfea | cbfa bcafdg cbfa bafcgd
abfgd baedc feb fgde fbagcd facbdge agcbfe bgafde fe ebdfa | bef fe dgfe feb
dfc dc afegbc bcafe fcead agefd cafdeb fcbeadg cbed cabdfg | cd geadf cfd bfaec
efacdgb abefdg efagbc af afe gdeab dbfa dgefa acegbd cdegf | cfdge gefda ecbgdfa eaf
feg gdbea edgbca gefdab caefdbg egfda afdgc fe cgfdeb efba | edafbg bdefgc egdfa gbead
bfeac becfd cbgdf gfabed gdefcab dcae edb de bgfaec fdeabc | bcfdg eagbfd fedbc cefdb
bgecd cea acegfbd ac gbefad cgdae fcag dfega abfedc gecdfa | gfdbae gcaf caedg ac
acbdfeg bfea agfed cedbg gedfba bfg dcgfea bf agfcbd gebfd | fgedb aefb gebdf fcgeda
gdcbfa agdfebc ecb fgcba ecgab efgcbd degca egfbac efba eb | egbfdc bfgcda ebaf gecda
gfcade fgedc agcfeb agdcbf dcae cgefbad ce ecg cdgfa dbfge | ebgdf fgcda gec feacbg
gcade fcdbea afegcb eafgc acfdbg aecfb fag dgcbafe gf bfge | decga gfeac gebf ecgbfa
fd dceabg bcgdef dcefag agcbf gcbfd gbceafd cdf dgebc fdeb | cgafde bdgec aegfdc gcabf
edgafbc bgaedf dbefcg efg fg acfeb bdega adgf cdeabg fbgae | dgacfeb egdfbac fbeca dabceg
dfecgb ecagbfd ceagd dgb dcfb bcegf abgedf cgbde db facgeb | efabgc ebfgc gdbce bdg
bcg dbcgea cg eadfcb agfbe cagd dacbe fcbdge abcge cedagfb | dbacgfe agdc dbcfgae bcg
dgf dfea cbadg gbeafdc fgcbae fgacde gcafe dgfac dfcbeg df | egdbcf eadf agcfd gefac
da dcgfae dac afcdg edaf fgbaec ebgadc gcfea cabgdfe dgbcf | dac fbaecgd fead ad
ecd bdecf bgdefac bafcd gdacbf eafd bcgdea bgfec bcadef ed | fgbec ebcfg fedcb cfdba
edacgb df gaedf gacfe dbegcfa dfg bfegda begad dafb cedgbf | faceg ebadfg fbdcge abfd
dgeca ebdfa dacegf cgba bcd bc acdbeg edacbgf edcab gedbcf | bc ecdag cb edagc
facbde deabfg daf gdbac efcd abecgfd cgafeb facdb fd bacef | baefgc edabcf dfce cfdbea
bafg gdfeb agbdfe ag adfge aedfc dbecag cfgedba bgedcf dga | ga dgefa gbaedcf fgebd
bcfed cafe cgbefd edfcab fa bgade dabfegc efabd fda gacdbf | bgade ebfdc decbf cbadgf
fcbgdae agef bcgda af cfbaed gdefc cfa dfcgeb gafcde fdgca | dafceb dbagc adgcbfe cdbafe
aebdfc dgcf aedgcb acdeg cfe fc dcfega bfage fgace cgfeabd | aefgc dbgefac egbfa egafbdc
bfgde bcdagf bga ga gfea abcde eafbgd edgab ecdbfag fecdgb | eacbgfd egbfda cdabe ebdgaf
fbcead afcdgb fbadgce fdabge ea adec aef afcbd ebgcf fbcae | afdebgc bafedg efa dfbca
gedafb fad gfeabc dgcf dfgabc bdaefgc dfcab abedc df gbacf | fagecb abgfc df gbacf
gcdeab efadg dfbc cebad ecafd efc bfcaedg acgefb dcaefb cf | ecfgba acedb fbeagc dacfe
gdfbc aefg adbceg fgabd fdcbea fa abfedgc bdaeg baf debgfa | fba debafc gaef cdbfg
cgbed dce gdebf fdecgab caedgb ec fagced bcae dbagc agdfbc | beafdgc edc efgdb edfcga
gdcbf fcga dcfbeg acfdbg cda agebd dabcg edbacf ca afdegbc | dac cfdbg bfecad bfcedga
gbacdf agef ebf gcedb cfgedba cagbf begafc gecbf ef cafdeb | bfe bdefgac ebf fadbgce
fdacg efdacb ebgd fdagb bfd dgbfaec efgbad cbaefg bd eagbf | baefg gecafdb ebcfgda cefagb
degcf ea afecgd fecgbd fecbdag cfaeg deabfg acde bgcaf fea | ecdgf eaf agefc gefcad
afegbc dbcfea bgefdc gadbc fbeac df dfb adbgcfe fcdab aefd | aegdcfb cdagb efabcd ecafb
cbagdf efgadb db bdg fbgeac dfcb daceg acbgf fbgaced dagcb | dgb dgebfa dgb faebgd
fcedb dcbage bc cfadeb dcb degacf gfcadbe dacef fabc gbfed | gfedb dbacef dbc dabcef
gefad ebdcfag ebcgd cgefdb abcdge ebf bf cgfeab dfcb ebgfd | dgbef afdge gfdae bdgec
dgbca bg gdb ecabfd efcdgba cgead begfad bcfg fcdba cadfgb | agdcb cdgfeab fdcgaeb gdafecb
egbdac gab edacb ag bgdfcea dbega agce agfcbd aebfdc debgf | fgbadc bag cbaegdf cdeagb
gafced agdf cdefa agfceb cbgaefd gecda agc debgc beacdf ag | dgcbe fgda gfad bgcefa
afegcd gc afecgdb bgfcd gfc fgdcbe bdfca gcbe begdf eabdgf | cgdfbe cg dcbfg gecb
afb bf afbced aefbc dgceab edabc fbcd befdga ecbadfg fcaeg | fb fdabce fbdc cbfd
fedba efdbgc fecagd dbc gdfacb ecdfbag bceg bc bcfde cgdef | cbdfge bgcfde acfgdb bdc
fd efacdb bcdgef fcegb fdb dfegb egadb ecabfg fbgcdae fgcd | dcgf gfdbe gdfc efacgb
cfbea gdbceaf bdafge fge gf afgd dacgeb dbgfec abdeg gbfea | gdaf dfcgbe fdga febac
bdgeaf gacedf gedafbc cgebfd cf fdcb cbage cfe fedbg bfceg | gbaec decagf ecf cf
eacfdb fb gcabf gbdf gfbcade afb dcfag gcabe acgbfd dgcefa | bgdf dabcegf gbafc acfgb
dbeafg fac degfc fgcbad dgbaf gfaecbd bfecda bacg dfagc ca | adbgf dgaefb acbg ac
fbdagc dfcea defgc fad faeg debfgc baecd af bgfcade agfced | ecdba dgface abdec gabdcf
dcabef gcefdab cadg dbfgae ceadb gd bdgce gdb dgceab efbcg | ecfbad dcaeb gbd adbcfge
cbegf ef cebfgd gdfabe cbagefd efg baecdg cfabg efcd gbedc | debgfc gdafbe baecdg agfecdb
fagbce aefbg eafdb gebcfd ga gaf eagcfbd ceag fbdcag cbgfe | cbgafd ga gfcbda ga
aecdf bgfadce eb acgbf dagfcb ecbagf defcbg cbfae fbe gbea | egbfca cafbe ebf bfe
bcgeda cb bcaf dbfgeca cdegf fdbeag ebc dcfbae bfcde daefb | efadcb gefcd fabedg cafebd
bcf fdgcb fdaecg gfcda dbcge fb cfegab afdb fdcbage acbdfg | cdgbf fb dgbec gcafeb
dfac bgefca ebdacf gdefabc gafebd fc dbcef bcdge fbead fce | abdfge dabfe cf afebcdg
dfabcg eagd cdegb caefb cad da adbec degfcb gdecba afgebcd | edgfcab adcbgf egad defgcb
gbefc fd becadg dfg abdfgc cfgbd afdc afdebgc gcbad bdgefa | bfcdg fbcdg cgbda abcgd
ce cebdgf aceb feacg bfecga fce aebfg ecdgafb dgbafe gdcfa | cfage fdcga fcaeg gcafe
gbac fceagb gadecfb ebagf gefbc cdebf feagdb gcf cg fadegc | agbc cfg fbdgea feabg
cd eacgfb facbe cfdeab afgbd bdfac caed dbgfaec bgdcfe cdf | acdfb afbdc cdf eacd
dbfgae geabf aefcg ebcgdfa eb feb agbdcf degb bfadce fgdab | fbdga gbdefa agbfd be
cdaef bdgc agceb becgad egfcbad cabde bda efbgac bd dbegaf | befagc bd ebcgda gabdce
ae gabdfe agdbf deabf febcd acegfb edga adegfcb fcgbad bae | dcabegf dgea geda abe
eg agec cadgf fbcdeg adgfe dcegbaf efg dfcagb fedba cfgade | adcgf gdcaf gef gbcafde
gfe cfgdab gafdb geda gefbd bfdgea bfaceg fedbc eg aedbfcg | gaebcfd cdafbg afgbcd ecdfb
fgbca dbf fd ebgad gafdb bgdaef fedgcab dbegac fged dbcafe | afdgb bfd dagbe befdag
dfgca aegdfc da fcdgaeb ebdcaf deag gfeac bgfdc ceafbg afd | daf adf gacfde cbdefa
adb gcabd cbged fgdceab cbgfa bdcfae da bgcfda dagf befgca | fgcab ad bda gcbad
edgfbc fbgecda bgcfe dc aecbgf dgbc cdbfae gfedc gdaef cde | cde fegbc edc befcgd
cebdg dfc bfde cagfe edcbfg fegcd cdbfgea afcgdb ecdbag fd | fd cfd gcbde feacg
dbgfc ebcfa gfbac aegf cfbage ag feabdc gdcafeb agb dcbgea | fabce afeg bacgefd gab
abgec cefbgad gfabdc feagc fag fgdce fbae af acgbfe bdgcea | decbgaf gfecd fcabgd fecdg
fgdcb fbagde fdgeb daefgc begdcaf baeg feg ge efbda dcfabe | dgcebfa eacdfg fdegb abeg
fdaecb gebad baedcfg gcde beg dbeac ge bgfeca bgdfa egbadc | egb gaedbc aebdc fbgda
becfdag gaefbd fcga ebcgda egafcb bgeaf gbefc gc cbdef bcg | ebgacf defcb acfg fcbaegd
fdgbea fecbd ebc ecdgf bgefdca cdbfae cb daebf ebgdca bacf | decfab bce cdgfeba ceb
bgc gfeba dcagfb bdfc eabgdcf dfgca gcefda cbgdae gfacb cb | agcdbf daegcfb fdcb bfcd
adefgc dc dbcage dcgf adc fdaec cbdgfae afebc abdfge fgead | dfbgae fcdg edafc cad
egca bfcade ga dag eadcf fdebg adfcgb dacgef egfda egdafbc | cfabgd gbdcaf cabfed bdfgac
dfgacbe ae ceafd cdgafe aec cbfda edcfg cagfbe dgea fgecbd | bcafd fdagce ace ea
fgbade bfedcag gdceba bf cedafb afb becda adfcg fdacb cefb | bf fba dcabe cfbad
acgeb dabc db cdebgf adgef gbd cafegb ebadcg aebdg fcbdaeg | gabec gebca abcge dagceb
egdcf fbgdec fb gdeacf gbfd bef bfcde becda egfcba gafbdec | dbgf fcdeb bdecf bfe
af ebdac dgacef abgf ecdbfg gefbd eaf abgcfed fadbge dfbae | fgaedb efa edfcga ecbad
ge fdbge dbgfec aecgfd gef bcge gfcabd befdgca cbdfg fedab | bedfcg gdcabf fge fge
cdbgea dge fcgabd deacbgf fdcea dcagb eg caedg bgae bfdegc | adgebc cegbfd dge egba
bgcfade bgedaf bfgc edfac ecgba efb bf dgaecb caefb aebgfc | cgeba efb abedcg gefacb
dfgec baedg egbdcf egbafdc egacfb efdcag gca cgade cfda ac | ac cdegf deacfbg edcag
dfeabc ag afbcge bag bfcdg adeg fgdcabe edcab dcgab edcabg | fgbecad bdcea bacefgd bdcafe
febdg fgdcba afdbgec gaefb aecb afcge ba abf abfcge cafged | afb gcafe fbgea aegfb
dab caedbg baecfg bafed db dbefag efbcgda afbge ceadf gfbd | bd ebfad cgbeaf db
fbg dabefcg dgfc gf fadegb ebgcf cgaeb bafdec befdc fdbgce | fgb bafdgce dgcf fabdge
gdfebac gdceb fcadge fgac cbeafd gaedfb dcfae age aegcd ga | deafgc acdef ga adfcge
begcfd cgf cg gcbd agedcf cbfaed bcfge cefdb aebgf eafgbcd | fcbde fgbea febcg gcdb
befcag befdcg fcdg bcefdga gebfd bfgec geabd fd bcefda fed | cegbf cgbeaf aebfdc geabcf
cdfeba cgabdf afbdceg bea decba ea eadf bcfda fegcab begdc | ebcgd eba ea baced
bcedg ac dca gcaedf bfdae dafgcbe dbgeac egfcdb bacg abecd | daefcg acgb ac bgefcda
bfegca bf edgbacf agcef feb fdcgea cbaf becdg cegbf afbdge | bef cbaf bacf fcebga
edg afbcdeg cafed cafged geca degfa gbafd ecdfbg ge eabcfd | bdfga dgafb deabfc dface
gfa afcgb cfgdea ga fdbcg febcad aecbfg aegb fcbae dgbafec | cfbea afgecd fcgab ga
edgfbc adbcgef gdabec egf dfega fdabe fg dfcage afgc cadge | dabfe cdaeg fge befgdc
dagecb ed cdgfb edcgb becag adbe egdafc cgabfed ced ecabfg | egbdc cgeab efgcdba cbfdg
afg egdacb gf dfgca fegcab cdaef dgabc afdcgb gdbf fdgbace | dcgfba cefdgab bfaedgc ecfad
ace agbecd eagf gfbdca cefda fdbec dacfge gfdca ea cbdgafe | gbdcaf deagfbc cafgd ea
efa baedg dcgaeb febdga efagd adgbcef dfba fedgc gabcfe af | dgafcbe dfba egbda edfag
fageb edgab da cgdeb fbedag ade afgecd begcfa acfegdb bdaf | ebgfca da ad gcdbe
ebfac dfbeg ecgfab acfg cg baedfc gce gfbdeac agedcb bfecg | gfeabdc fdbge ebacfd gacf
abfcg bgfea gbc bdgefca bdacf efcg gecbaf cg gbdafe bdegca | gadebc aebdfg bdefga gc
cedgb ebfa edcba dab defcab dfeca gacedf bgdefac cbgadf ba | abced abfecdg ba cgdfba
abcde aedcf afe bcfgdae fbec adcfbe ebdgca ef dbgaef dfgac | cbfe adebc adegcb aebdgcf
fdgcea aebdgcf egdabc defcbg efcba acbed gcdae bagd db edb | eafbc eabdc eacfb fcedbg
cefbd gefcb gf becafgd cfdbag gaef cagbe bgf dcaegb efgcba | bgf fage gefa fbg
ceafb fcegda fcbead cabfg dcgfbea aecfd eb bdcefg bef adbe | fedcag fgcaed gafbc cdfae
efcabgd fbcda efcad cfeg fde adbegc deagc aefdgc fe dbfaeg | dfe ecgf abfdc eagcd
dcebga afgbc gfbad efdbcag ca cfea efgcb eabgcf gcbfed cga | afcebg gecfb ac ac
gceaf dafgceb afcbeg geacfd fbcead bfa fb gbef acbfg acdbg | acgedfb fb gbdac fab
gbf bgecfd adgfcbe bfgec bfcgda efdcab gf defg bdcef gecba | dgfabec bfg fg becdf
dg dgb gbacd bdagfc gafd gaceb dbacfe fgebcd gfdaecb cbfad | gbecfd cagbe bdg abdcg
cdgbe eadcg dcb db bgecfa cegbdfa fdeb acgdbf becfg decgfb | febcg cgbde gfbcae edcbg
gcfdbae dgf dgeca dcfge dcegbf fcdeba fedcb gfbc afbdeg gf | edfcb dbafec dcgfabe fg
dfbaceg ab edcfb adb egabcd dgfbac fbag cfbad fagcd gedacf | fgdabc ab feacgd ab
debga ec edc gfdca agdce afegbd aecdgb bcea cbefgd baefcgd | gadfc defgcb caeb abce
edabfc fdaeg dgacfe bdacfg cfabdge efcda fgd gdce dg gfbae | abcdfg dfeag edcg acegdf
bagcfe afedc dbec fadecb fbdega ed afdcg aefcb efagcdb dae | cbedgaf gefabc decb ed
abe fadecg bfcage bcdafe ecfad afdgb afbde be bedc bfeacdg | bgfad fcdgeab be bcfgead
bf decgb efb bfegdca bgfd adfce fcdeb gabefc cdaegb fecbgd | decbg fb gdebc gdfb
gfcbed efdcb dafbcg db gedb deacf cgfbe bdf abfecg defcagb | bdfec cfdeb bd adecf
gceab gefbda bdegafc fgbd bedacf egd agdeb daefb fagedc dg | dg dacebgf bafegd edg
abecfg dgbca egc aegcb acgdfe agefdb bfec ce ebcdagf bfgae | bcfe bcfe acgbef gfedcab
bfacg eafdb cadbge fecbad gcbdafe ge dabegf egfd gae abgfe | ge efgba faebcd dafeb
gebd db gbcdfea fbd acebgf fedab agcbfd afecd befadg gbfea | bdeaf febag fgecab afcebdg
defac gdbfce dfbga deagbfc geadfb cbag cdafgb facdg cgf cg | eabgdf caefd cbag gfc
dafbc fgead edgfac cae gdabec fgeabcd ec acdef debafg cgef | ebcdga cgfeda efdgac cgeafd
ec dcbafe gbafcd dfgbc dec baedfcg faedg egbc egbfcd dgcfe | dce gbcefd gabcfde adcfeb
cbegdf ad aecgf befcad agdfc gcbdf adc cfgdbae dabfcg agdb | bdga bagd fcgad ad
edcbafg ab eafgcb ecdba egfdcb fcabed debcf abdf eba dagce | aeb dbcegf geadcfb aeb
bg gcefa aefbdc bcgae fbegacd cadeb fcegdb bgc eagcbd badg | bcgea adbfcge cebda cdegab
ebgad gf edfcb cegdab dbaegf agfd dgbcefa efdgb fbg gabecf | fcadbeg bcedagf dfbge gdaf
gbcfea ecdbga cgebf bdefcg fdbe de acgfd gedcf fecdbag ced | edfgcb fbde beagcfd gecabd
gfdceb aegbc ca cbdafg daebcg bac edac gcdbe abegf ceadfbg | ca bca gdebc decgb
cbfea fgadbe eacgf daefcb fgdeabc acdb ba bgecdf fba fedcb | cdfbega bcfea ba badc
cbfge bdca dgeba dce ebgcd dc gdebac fcgeadb beafgd fdceag | ebgcd gcdfae begdc agbde
acg cagdfe cebfdg dgcfa fdbac gdcef baegfc acdegbf ag dgae | cadfg efgabc egcfad dbcaf
bfae ea eadcfgb dcgba dacefb dcfaeg dae bdcef decba egbfcd | dgcba cdbeaf cedbf fcaegd
fcga agbedf edcgaf ca dabcef fegadbc ecgda eca gcdbe gefad | ca ca dgebc eca
bcead fd gbedfa adcgefb fdgcba bagfce adf fdbae dgfe abfeg | ebafgc fegd dfabe edgf
bca cbfgea cdabfe cedfa fdbc cgabefd cagdef eacbd cb bgdea | dcbaef cb bfcd cab
baedgf debaf edga bgafedc bda ecfbd ad bgdfac afgbe abcfge | aged bfedc abd cdebf
acgdb agcdef egc baefcd cfead fbdgeca ge dgace gaef dgcfeb | cbeafd acfed ebfdgc fdceag
dbegfa ef fbagce dcgfab efb agfbc cegdfab fecg dcbae aefcb | bgdfea afcgbe fe bafcg
eabdf fegb aecfgbd fg cabdgf agf dgeca adegbf dacfbe dgefa | bdecafg fgbe agbefd fabed
gdbec facbeg gbedf egabc dgaebc dcb adgc baecfd cd ceadgbf | dc dc cbaefd cgdbeaf
ef cfgab fegbc bdecg adbcfge agebfc bafcgd acfe ebf dfaegb | fbdgae ecfbg feac afec
agdebfc dae ecdf bfacge fegca dabcg de gdace gdabfe cfgead | egbdaf gabcd dea gfbace
ecg gabce fdecbg edacgb eacbf aegdb cg fcbeadg abgfed dgac | dbgae gec geabc ebcgdf
fabec fd egdfca dcf dcfgbe dgeabc dgecb febgacd bfdg dfbec | beacf df egacfd fbcae
eacf gfebad cefgad adcgf af bceadg dfa bfdgc gfeadbc ecadg | adf aefc dfagce caegd
afgbec fbgdc ag gaebcd agc gfdeacb bcefa ebcfda fgbac fgae | fbgdc bdgfc agc dacbef
bc bfcad cbgfed baec cbd fdacg fdbae aedgfbc faegbd cdbfea | ecgbdf gfbdea dfcag beca
bedgafc fbdea efgdbc edg cefg fbgdc eg cgafdb febdg egdabc | fcbgda ge cbagdfe gbdcf
bgdeca fadcegb adg cfaegd bdae edcbg ad bcgfa cadgb fecgdb | dafgce gecdba dbfegc edbgfc
ecgafd faebg gbce defbacg ebfagc eab fadecb be aecgf dfgba | bfgae dfabgec efacg ebgfa
edfg fad bgead cgaebd bcdgaf fdebgac dafgbe ebfac badfe df | eabfc begfad dgbea dbeaf
cdaeb acdbfg gfeac aefcd gecfad gefd bfgcae fd beacgdf daf | egcaf gbdafc bagecf fedg
gf aefcd adegbc fecdgb gcebd fcbg cgdef edfabg eadbfgc dgf | bfgc bgecd gdcefba abcdeg
gfdcbae cegdab ecgbf dcabef cegdb caegf fbgd bf bfe edfbcg | bf cbfeg ecfag bef
befdga bcagdef ebgaf bcfega ce cbge gfacd cae cfaebd eagfc | fdgeab cgeaf fgceab eacfg
adgbe gcadbef gbfe befadc fdbga agced bde acbfgd fgbeda eb | abefcd dfcaeb gaecd decga
gdbfec fbdce fgcade ebadfgc cb eacdgb bcd edfba fgbc edgfc | gfeadcb bfead fgbc cbd
dfaegc deabgc fabdceg gcf fc fdbcag cfde gacfe fbeag aegcd | afedgc gcf cfed fdec
acdfb dfaec bdcfga ceafbg gedabc fbgd bf cgbad cbf fdgcabe | bfegcda gadbc cdefa caedf
cfgae dcfageb gbdf gebacd edcfg cdg cdbef dg cdfeab bcefdg | geacf dfgb dg facge
gcdab dabgec fecadg ae cbadgf ade cbaed beag cebdf cbdfgae | bacdg eda facbedg gfbdac
fd dfgbcae bdf fgbda cgabf beagd cbadfe gdabfe dbaceg fdeg | fbd gdbae cdebgaf fadgb
ecgdb bfdgec fce caebgd fc fageb fcedga gcebadf cbdf egcbf | decgb cdgfea edcafg cfdebg
bafgd abcedf egb bdacge fageb adecfgb febcag fecab cefg ge | ge bafec ge ge
agcbd dac dcebfga ac ceba bcged gaedfc ebgdca adgbf cbfged | bgfad bace fecbgd adc
agcfd cag gbecfad agdfe gcedfb cbad ac cgbfae bdgcf acfbgd | gbafcd eafbcg gdafe cgefab
geadfc bfeg bf bcf bdgca ceadgbf eabfcg bgcfa cfedab afgce | acefg gacdb agecf cgbfa
aecbd afced af dfcge afbc edfcab cgbeda gabfde afd faegcdb | fgedc dfaec bdfaec cdegf
dcbfge ab bdgeca bae gcba debcg dagbfe gdeacfb acedb acdfe | cdbgea adgceb ebdca aegdfb
ecfadg agfce da cfbgea dae aedcg bfaced cgdbefa debgc dfga | eacdg afcebd faegc bafegc
df fdg dfcega gfbce aebdg bdafge bfad egbdf dbafgec acdgeb | afgedb egfdb df fbad
eafbc egbac fcb cf cgbadf becdagf cbdaeg efagcb aefbd ecfg | cf cf cgfe acegb
fceab cedfabg fc fadc cgbea bdfea egfadb gecfdb fbc abcefd | bfc ebafc aefcdgb bcafe
gb efadb dcefba fdcga fgbaed fadgb feagcb ebdg beacgfd gab | gb feagcb gb acbdegf
ebc acgedbf gcfeb edcabf bc bcgefd bcdg gcefd gdfeac egbfa | gcdb gcdfe cdbg dbafce
bgdc efacdg dabce begad cgbaed fabeg baefdc fabecdg gd edg | edabc gd geabf gafeb
gaecdf fabc fgaec bc bgc gcfbe bgcdea dgebcfa efgbd afebcg | afcbeg adgfbec gcb gebafc
aef facedg fdgbce cade fegcd fbacgde faecg gfabc egdfab ae | bfdeacg edac eaf fgedacb
eafcgd cebgf fdc debcfg dbcfg afbgec dc fdbga dbce cedfabg | cgeabf facedg bcaegf bdfgc
afegbdc bcaefg decba gdfb aedgfb efb adfge bfade agefcd fb | cfaegd gcdafe ebadf gecfad
afcb bgdcfe bacdfe ceadf cbefd caged bgedaf af egfdbca fda | adf ecbfd efdbc adefgb
cgdaef eagfb afdbge gfedb ecfbd agbd cbgefa gd agcbefd dfg | agcfbe fgcdae fdg fgd
ed afbge fbcaeg bcdfa gfeabd gfed egbfcad geadcb adbfe ead | begadc abefg dea dea
fceba deafbc aegc edbgafc bfdcg ag dbafge cfbeag abg cafgb | gab agb abfegd ecga
fcedg cfdaegb dbfg egcfbd bgc cgbefa cebgd ecbad bg dceafg | cgb fcbgae ecbda gebcd`;

console.log('--- A ---');
//console.log(day8a(data));

console.log('--- B ---');
console.log(day8b(data));