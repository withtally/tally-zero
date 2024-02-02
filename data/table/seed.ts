import fs from "fs";
import path from "path";

import { ParsedProposal } from "@/types/proposal";
import { ProposalState } from "@config/intial-state";

const generateFakeProposal = (): ParsedProposal => {
  return {
    id: Math.floor(Math.random() * 1000),
    proposer: `0x${Math.random().toString(16).slice(2, 10)}`,
    targets: [`0x${Math.random().toString(16).slice(2, 10)}`],
    values: [Math.random().toString()],
    signatures: [`signature${Math.random().toString(16).slice(2, 6)}`],
    calldatas: [`calldata${Math.random().toString(16).slice(2, 6)}`],
    startBlock: Math.floor(Math.random() * 10000).toString(),
    endBlock: Math.floor(Math.random() * 10000 + 10000).toString(),
    description: `# Toris cedentique canis

    ## Centum virum mons coniunx

    Lorem markdownum duobus *ducentem capillos sono* fructus placuere confugit
    habuere quaerentes lustrat. Tamen caelestibus spreta. Instruxit moveri: novis
    ille quas *clauserat est deieci*, sua indignantesque dolor, **incumbensque**
    Troiae Stygias, falsam bracchia. Invenio genitor nam, hanc facundia ferit.

        if (brouterProperty(debugFi, 4 + 80) == sequence_bcc /
                wrap_processor_overwrite - lcd) {
            layout.lifo(lockCertificatePiconet + 2, passiveAndFpu);
        }
        var webcam = vaporware(3, whitelist_user_digitize, piconet_on_dsl(284120 *
                cross, 1));
        var addressVariable = ole(integer.ergonomics.batch(dvr, router_wrap, 3 +
                cdma));

    ## Virginibus naides

    Iussa nec ubique sonant; formosior caede fuerint lapsus; ut sit corpore. Membra
    dissociata fontes **salices exstinctus** manuque primum puto tenues negare,
    tamen vertex fera praecordia, matrisque.

        itIpxAnalog = plug(edutainment - activex);
        var interactive = keyApacheCompact;
        if (status_trim_graymail >= webmail) {
            speed(domain_myspace_type);
            clean_qwerty_bookmark.digital(1, 50, image_kernel_interface);
        } else {
            dllMultimediaAnalyst(99, speedTftDongle, bank_link_direct);
            sql_virus += 4 * base_bare_contextual + 1;
            graymail_rpc_port = sdk(1, 14, 2 + eccPodcastDesign);
        }
        var finder = drop(alignment_petabyte, 4, protocol_unmount_reimage) + pitch;`,
    state:
      ProposalState[
        Math.floor((Math.random() * Object.keys(ProposalState).length) / 2)
      ].toLowerCase(),
  };
};

const fakeProposals: ParsedProposal[] = Array.from(
  { length: Math.floor(Math.random() * 100) },
  generateFakeProposal
);

fs.writeFileSync(
  path.join(__dirname, "proposals.json"),
  JSON.stringify(fakeProposals, null, 2)
);

console.log(":white_check_mark: Fake proposals generated.");
