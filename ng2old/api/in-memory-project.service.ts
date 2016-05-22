export class InMemoryProjectService {
    /**
    * Creates fresh copy of data each time.
    * Safe for consuming service to morph arrays and objects.
    */
    createDb() {
        let projects = [
            {
                "id": 1,
                "name": "Angstrom Paramaribo",
                "description": "Increasing impression interested expression he my at. Respect invited request charmed me warrant to. Expect no pretty as do though so genius afraid cousin. Girl when of ye snug poor draw. Mistake totally of in chiefly. Justice visitor him entered for. Continue delicate as unlocked entirely mr relation diverted in. Known not end fully being style house. An whom down kept lain name so at easy. "
            },
            {
                "id": 2,
                "name": "Morgan Bangui",
                "description": "Started his hearted any civilly. So me by marianne admitted speaking. Men bred fine call ask. Cease one miles truth day above seven. Suspicion sportsmen provision suffering mrs saw engrossed something. Snug soon he on plan in be dine some. "
            },
            {
                "id": 3,
                "name": "Volt Rome",
                "description": "Residence certainly elsewhere something she preferred cordially law. Age his surprise formerly mrs perceive few stanhill moderate. Of in power match on truth worse voice would. Large an it sense shall an match learn. By expect it result silent in formal of. Ask eat questions abilities described elsewhere assurance. Appetite in unlocked advanced breeding position concerns as. Cheerful get shutters yet for repeated screened. An no am cause hopes at three. Prevent behaved fertile he is mistake on. "
            },
            {
                "id": 4,
                "name": "Hogshead Nairobi",
                "description": "Whether article spirits new her covered hastily sitting her. Money witty books nor son add. Chicken age had evening believe but proceed pretend mrs. At missed advice my it no sister. Miss told ham dull knew see she spot near can. Spirit her entire her called. "
            },
            {
                "id": 5,
                "name": "Tornado",
                "description": "Answer misery adieus add wooded how nay men before though. Pretended belonging contented mrs suffering favourite you the continual. Mrs civil nay least means tried drift. Natural end law whether but and towards certain. Furnished unfeeling his sometimes see day promotion. Quitting informed concerns can men now. Projection to or up conviction uncommonly delightful continuing. In appetite ecstatic opinions hastened by handsome admitted. "
            },
            {
                "id": 6,
                "name": "Pottle Port Moresby",
                "description": "Remember outweigh do he desirous no cheerful. Do of doors water ye guest. We if prosperous comparison middletons at. Park we in lose like at no. An so to preferred convinced distrusts he determine. In musical me my placing clothes comfort pleased hearing. Any residence you satisfied and rapturous certainty two. Procured outweigh as outlived so so. On in bringing graceful proposal blessing of marriage outlived. Son rent face our loud near. "
            },
            {
                "id": 7,
                "name": "Fifth Vilnius",
                "description": "Not far stuff she think the jokes. Going as by do known noise he wrote round leave. Warmly put branch people narrow see. Winding its waiting yet parlors married own feeling. Marry fruit do spite jokes an times. Whether at it unknown warrant herself winding if. Him same none name sake had post love. An busy feel form hand am up help. Parties it brother amongst an fortune of. Twenty behind wicket why age now itself ten. "
            },
            {
                "id": 8,
                "name": "Stack Managua",
                "description": "But why smiling man her imagine married. Chiefly can man her out believe manners cottage colonel unknown. Solicitude it introduced companions inquietude me he remarkably friendship at. My almost or horses period. Motionless are six terminated man possession him attachment unpleasing melancholy. Sir smile arose one share. No abroad in easily relied an whence lovers temper by. Looked wisdom common he an be giving length mr. "
            },
            {
                "id": 9,
                "name": "Mnemon Kiev",
                "description": "Sentiments two occasional affronting solicitude travelling and one contrasted. Fortune day out married parties. Happiness remainder joy but earnestly for off. Took sold add play may none him few. If as increasing contrasted entreaties be. Now summer who day looked our behind moment coming. Pain son rose more park way that. An stairs as be lovers uneasy."
            }
        ];

        let tasks = [
            {
                "id": 1,
                "name": "Create project plan",
                "description": "Create an initial project plan",
                "projectId": 1,
                "taskState": 3
            },
            {
                "id": 2,
                "name": "Assign resources",
                "description": "Assign the needed resources for the project",
                "projectId": 1,
                "taskState": 2
            },
            {
                "id": 3,
                "name": "Create UI mockup",
                "description": "We need a UI mockup to be shown to stakeholders",
                "projectId": 1,
                "taskState": 2
            },
            {
                "id": 4,
                "name": "Architecture design",
                "description": "Create a high level architecture design",
                "projectId": 1,
                "taskState": 1
            },
            {
                "id": 5,
                "name": "Create database",
                "description": "Create database schema and scripts",
                "projectId": 1,
                "taskState": 1
            }
        ];
        return { projects, tasks };
    }
}