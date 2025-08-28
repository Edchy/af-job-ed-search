import {
  FormRadiobuttonVariation,
  LayoutBlockVariation,
} from "@digi/arbetsformedlingen";
import {
  DigiFormCategoryFilter,
  DigiFormFilter,
  DigiFormRadiobutton,
  DigiLayoutBlock,
  DigiLayoutContainer,
  DigiTypography,
} from "@digi/arbetsformedlingen-react";

const educationForms = [
  {
    key: "af arbetsmarknadsutbildning",
    value: "Af arbetsmarknadsutbildning",
  },
  {
    key: "folkhögskola",
    value: "Folkhögskola",
  },
  {
    key: "grundläggande vuxenutbildning",
    value: "Grundläggande vuxenutbildning",
  },
  {
    key: "gymnasial vuxenutbildning",
    value: "Gymnasial vuxenutbildning",
  },
  {
    key: "högskoleutbildning",
    value: "Högskoleutbildning",
  },
  {
    key: "konst- och kulturutbildning",
    value: "Konst- och kulturutbildning",
  },
  {
    key: "utbildning med endast tillsyn",
    value: "Utbildning med endast tillsyn",
  },
  {
    key: "yrkeshögskoleutbildning",
    value: "Yrkeshögskoleutbildning",
  },
];

const SearchFilters = () => {
  return (
    <section>
      <DigiTypography>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <DigiFormFilter
            afFilterButtonText="Utbildningsform"
            afSubmitButtonText="Filtrera"
            afName="Utbildningsform"
            afListItems={educationForms.map((form) => ({
              id: form.key,
              label: form.value,
            }))}
          />
          {/* <DigiFormCategoryFilter
            afCategories={[
              {
                name: "Kategori Ett",
                hits: 3,
                selected: true,
              },
            ]}
            afVisibleCollapsed={4}
            afStartCollapsed={false}
            afHideToggle={false}
          ></DigiFormCategoryFilter>
          <DigiFormRadiobutton
            afLabel="Radioknapp"
            afVariation={FormRadiobuttonVariation.PRIMARY}
          ></DigiFormRadiobutton> */}
        </div>
      </DigiTypography>
    </section>
  );
};

export default SearchFilters;
